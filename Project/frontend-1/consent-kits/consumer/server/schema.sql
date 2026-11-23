-- Suggested table for consent records (append-only: one row per agreement; never update or delete on new terms).
CREATE TABLE member_consents (
  id               BIGINT PRIMARY KEY AUTO_INCREMENT,
  consent_id       VARCHAR(40)  NOT NULL UNIQUE,      -- shown to the member on the receipt
  member_id        VARCHAR(64)  NOT NULL,             -- from the session, not from the request body
  terms_version    VARCHAR(20)  NOT NULL,             -- e.g. 2026.10
  language         VARCHAR(10)  NOT NULL,             -- language of the page when agreeing
  c_terms          BOOLEAN      NOT NULL,             -- required
  c_privacy        BOOLEAN      NOT NULL,             -- required
  c_age            BOOLEAN      NOT NULL,             -- required
  c_marketing      BOOLEAN      NOT NULL DEFAULT FALSE,
  c_analytics      BOOLEAN      NOT NULL DEFAULT FALSE,
  c_recordings     BOOLEAN      NOT NULL DEFAULT FALSE,
  c_sensitive      BOOLEAN      NOT NULL DEFAULT FALSE,
  sections_read    VARCHAR(120) NULL,                 -- e.g. "1,2,3,22"
  accepted_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- server time
  client_time      VARCHAR(40)  NULL,
  timezone         VARCHAR(60)  NULL,
  ip_hash          CHAR(16)     NULL,                 -- salted hash, not the raw IP
  user_agent       VARCHAR(300) NULL,
  INDEX idx_member (member_id, accepted_at)
);
-- Show the page when: no row for the member, or the latest row's terms_version <> current version.
-- Optional choices changed later in account settings: insert a new row (keeps the history).
