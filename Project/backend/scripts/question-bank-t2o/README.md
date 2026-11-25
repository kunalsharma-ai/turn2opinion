# Turn2Opinion question bank (shared by Kunal, 25 Nov 2026)

`Question.json.gz`, `Profile.json.gz` and `Option.json.gz` are the full export Kunal shared: 819 questions,
296,435 options and 48 profiles (36 Consumer `b2c`, 12 Teen `minor`). There are no Professional (`b2b`) profiles in it.

Load it with `scripts/question-bank-sync.js` (run from `Project/backend`):

```bash
node scripts/question-bank-sync.js --check                                                           # segment check only
mongodb=<connection string> node scripts/question-bank-sync.js --origin www.turn2opinion.com           # dry run: what would change
mongodb=<connection string> node scripts/question-bank-sync.js --origin www.turn2opinion.com --apply   # write (backup in logs/)
mongodb=<connection string> node scripts/question-bank-sync.js --rollback logs/question-bank-sync-….json
```

- **Segments:** each profile stays in its own segment (`slug` + `category`). The check stops `--apply` if a profile lists a
  question that is not tagged for its segment (for example, a Consumer-only question in a Teen profile), a question that
  does not exist, or a choice question with no options.
- **Matching:** questions by `name`, profiles by `slug` + `category`, options by `question` + `value` + `parentValue`.
  Saved member answers are keyed by question name, so they stay attached. Only fields that differ are written.
- **Records missing from the export** (for example, the Teen `automobile` profile) are left alone and listed.
  `--prune` switches them off (`isDeleted: true`). A rollback switches them back on.

Check results for this export: it passed (no errors). These warnings were reported, and the data was not changed:
- Health (Consumer and Teen): `disabled` and its follow-ups depend on `physically-challendged`, which no profile asks,
  so they are never shown.
- Teen Lifestyle and food: `food12` and `food13` depend on `food11`, which was removed from the Teen profile.
- 38 questions are in no profile (account fields like `workemail` and `age`, the old welcome questions, and others).
