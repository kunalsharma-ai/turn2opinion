-- Business Professionals Panel — suggested table for consent records.
-- Append-only: one row per signed agreement; never update or delete when terms change (records are evidence).
CREATE TABLE business_member_consents (
  id                 BIGINT PRIMARY KEY AUTO_INCREMENT,
  consent_id         VARCHAR(40)  NOT NULL UNIQUE,      -- shown on the member's certificate (T2O-B2B-YYYYMMDD-XXXXXXXX)
  member_id          VARCHAR(64)  NOT NULL,             -- from the session, not from the request body
  terms_version      VARCHAR(20)  NOT NULL,             -- e.g. B2B-2026.10
  language           VARCHAR(10)  NOT NULL,             -- language of the page when signing
  -- required approvals
  c_terms            BOOLEAN      NOT NULL,             -- Terms & Conditions
  c_privacy          BOOLEAN      NOT NULL,             -- processing under the Privacy Notice
  c_accuracy         BOOLEAN      NOT NULL,             -- age + accurate professional details
  c_confidential     BOOLEAN      NOT NULL,             -- no confidential business information
  -- optional approvals
  c_interviews       BOOLEAN      NOT NULL DEFAULT FALSE,  -- expert interviews / calls / recordings
  c_client_contact   BOOLEAN      NOT NULL DEFAULT FALSE,  -- identified studies / client follow-up
  c_sensitive        BOOLEAN      NOT NULL DEFAULT FALSE,  -- sensitive or regulated topics
  c_marketing        BOOLEAN      NOT NULL DEFAULT FALSE,
  c_analytics        BOOLEAN      NOT NULL DEFAULT FALSE,
  clauses_reviewed   VARCHAR(120) NULL,                 -- e.g. "1,2,3,6,23"
  theme              VARCHAR(5)   NULL,                 -- light | dark (UI preference at signing)
  accepted_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- server time
  client_time        VARCHAR(40)  NULL,
  timezone           VARCHAR(60)  NULL,
  ip_hash            CHAR(16)     NULL,                 -- salted hash, not the raw IP
  user_agent         VARCHAR(300) NULL,
  INDEX idx_member (member_id, accepted_at)
);
-- Show the page when: no row for the member, or the latest row's terms_version <> current version.
-- Optional approvals changed later in account settings: insert a new row (keeps the history).
