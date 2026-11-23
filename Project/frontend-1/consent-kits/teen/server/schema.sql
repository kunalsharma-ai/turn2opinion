-- Turn2Opinion — Teen (13–17) participation consent. Reference schema (PostgreSQL; adapt types for MySQL).
-- Consent records are EVIDENCE: never update a row's meaning in place. A new terms version or a withdrawal
-- appends an event; the current state is the latest row per participant.

CREATE TABLE minor_consent (
  consent_id                 VARCHAR(40)  PRIMARY KEY,            -- T2O-MC-YYYYMMDD-XXXXXXXX
  audit_ref                  VARCHAR(40)  NOT NULL,
  participant_id             VARCHAR(64)  NOT NULL,               -- from the session, never from the browser
  age_band                   VARCHAR(8)   NOT NULL CHECK (age_band IN ('13-15','16-17')),
  country                    CHAR(2),
  policy_version             VARCHAR(40)  NOT NULL,               -- e.g. MINOR-2026.10
  privacy_notice_version     VARCHAR(40),
  assent_version             VARCHAR(40),
  language                   VARCHAR(10)  NOT NULL DEFAULT 'en',
  terms_accepted             BOOLEAN      NOT NULL DEFAULT FALSE,  -- Part A agreed with one tap
  terms_topics               TEXT[]       NOT NULL DEFAULT '{}',    -- the six topics the agreement covered
  terms_accepted_at          TIMESTAMPTZ,

  -- Part B — copied from the member's own guardian record at submit time (the page never sends it),
  -- and NULL when the teen said no (data minimisation)
  guardian_name              VARCHAR(120),
  guardian_relationship      VARCHAR(16)  CHECK (guardian_relationship IN ('father','mother','guardian','representative')),
  guardian_contact_type      VARCHAR(8)   CHECK (guardian_contact_type IN ('email','phone')),
  guardian_contact           VARCHAR(120),                        -- encrypt at rest
  guardian_country           CHAR(2),
  guardian_source            VARCHAR(20)  DEFAULT 'member-record',  -- where the details came from (no signature is taken)
  consent_participation      BOOLEAN      NOT NULL DEFAULT FALSE,  -- required
  consent_privacy            BOOLEAN      NOT NULL DEFAULT FALSE,  -- required
  consent_contact            BOOLEAN      NOT NULL DEFAULT FALSE,  -- required
  consent_study_contact      BOOLEAN      NOT NULL DEFAULT FALSE,  -- optional
  consent_recording          BOOLEAN      NOT NULL DEFAULT FALSE,  -- optional (interest only; each study asks again)
  consent_sensitive          BOOLEAN      NOT NULL DEFAULT FALSE,  -- optional (interest only; each study asks again)

  -- Part E — internal
  guardian_permission_status VARCHAR(16)  NOT NULL CHECK (guardian_permission_status IN ('not-requested','pending','verified','refused')),
  verification_method        VARCHAR(16),                         -- email-link | sms-code
  verification_token_hash    CHAR(64),                            -- sha256; cleared after use
  verification_expires_at    TIMESTAMPTZ,
  verified_at                TIMESTAMPTZ,
  teen_assent_status         VARCHAR(10)  NOT NULL CHECK (teen_assent_status IN ('agreed','declined')),
  teen_assent_at             TIMESTAMPTZ,
  account_activation_status  VARCHAR(10)  NOT NULL DEFAULT 'blocked' CHECK (account_activation_status IN ('blocked','active','declined')),
  withdrawn_by               VARCHAR(10)  CHECK (withdrawn_by IN ('guardian','teen')),
  withdrawn_at               TIMESTAMPTZ,

  received_at                TIMESTAMPTZ  NOT NULL DEFAULT now(),
  ip_hash                    CHAR(16),
  user_agent                 VARCHAR(300),

  -- the activation rule, enforced by the database as well as the API
  CONSTRAINT active_needs_everything CHECK (
    account_activation_status <> 'active' OR (
      guardian_permission_status = 'verified' AND teen_assent_status = 'agreed' AND terms_accepted
      AND consent_participation AND consent_privacy AND consent_contact AND withdrawn_at IS NULL)),
  CONSTRAINT no_guardian_data_on_decline CHECK (
    teen_assent_status <> 'declined' OR (guardian_name IS NULL AND guardian_contact IS NULL))
);

CREATE INDEX minor_consent_participant ON minor_consent (participant_id, received_at DESC);
CREATE INDEX minor_consent_token ON minor_consent (verification_token_hash) WHERE verification_token_hash IS NOT NULL;

-- append-only audit trail of every change (submitted, resent, guardian-verified, withdrawn, teen-declined)
CREATE TABLE minor_consent_event (
  id          BIGSERIAL    PRIMARY KEY,
  consent_id  VARCHAR(40)  NOT NULL REFERENCES minor_consent(consent_id),
  event       VARCHAR(24)  NOT NULL,
  at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  snapshot    JSONB        NOT NULL
);
