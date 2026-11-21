/**
 * STEP 1 of the parent onboarding page — "Module 1: Parent/Guardian Registration".
 *
 * Source: Global Teen Research Panel Questionnaire (Ages 13-17), Module 1.
 * Question keys (P01 … P12, HQ1/HQ2/HQ4) are kept exactly as the questionnaire
 * numbers them, so the data your backend receives lines up with the master
 * document without a translation table.
 *
 * v2.0 changes (all requested):
 *   · the name is three boxes — first (required), middle and last (optional) —
 *     stored as parent-first-name / parent-middle-name / parent-last-name, plus
 *     the joined `parent-name` the v1 backend already reads;
 *   · the age band P05 is now worked out from a date of birth picked on a
 *     calendar (`parent-dob`), so P05 is still sent, unchanged in format;
 *   · P07 "How would you prefer us to contact you?" takes several answers;
 *   · the mobile number has every country, with its flag, name and dial code;
 *   · marital status uses the same five values as the Member Profile Studio's
 *     `relationship` question, so both pages store identical values;
 *   · the optional health section asks for itself much more clearly.
 *
 * Option format: [label, stored value, emoji]. The emoji is unique within the
 * question and chosen for that answer (tests/data.test.mjs enforces both).
 */

export const PARENT_SURVEY = {
  id: 'parent__registration',
  owner: 'parent',
  name: 'Parent & guardian registration',
  blurb: 'About you, so we know who is giving permission.',
  icon: '🧑‍🍼',
  theme: 'trust',
  sections: [
    // ───────────────────────── who you are ─────────────────────────
    {
      name: 'About you',
      icon: '👤',
      qs: [
        {
          n: 'parent-first-name',
          kind: 'name',
          q: 'What is your name?',
          help: 'As it appears on the documents you would use to confirm you are the teenager’s parent or guardian. Only your first name is required.',
          fields: ['parent-first-name', 'parent-middle-name', 'parent-last-name'],
          joined: 'parent-name',
          req: true,
        },
        {
          n: 'parent-gender',
          q: 'How do you describe yourself?',
          kind: 'choice',
          req: true,
          // the same five options, and the same stored values, as the Member
          // Profile Studio's `gender` question — so both pages agree
          o: [['Female', 'Female', '👩'], ['Male', 'Male', '👨'], ['Non-binary', 'Non-binary', '🧑'], ['Another identity', 'Other', '🌈'], ['Prefer not to say', 'Prefer not to say', '🤐']],
          other: 'Other',
        },
        {
          n: 'parent-dob',
          q: 'What is your date of birth?',
          help: 'Pick it on the calendar — tap the year to jump straight to it. We use it to confirm you are an adult.',
          kind: 'dob',
          segment: 'adult',
          derive: 'P05', // the questionnaire's age band, worked out for you
          req: true,
        },
        { n: 'P01', q: 'In which country do you live?', kind: 'country', req: true },
        { n: 'P02', q: 'Which state, province or region do you live in?', kind: 'region', from: 'P01', req: true },
      ],
    },

    // ──────────────────── relationship & authority ────────────────────
    {
      name: 'Your household',
      icon: '🏡',
      qs: [
        {
          n: 'P03',
          q: 'What is your relationship to the teenager?',
          kind: 'choice',
          req: true,
          o: [
            ['Mother', 'mother', '👩‍👧'],
            ['Father', 'father', '👨‍👦'],
            ['Legal guardian', 'guardian', '🛡️'],
            ['Foster guardian', 'foster', '🤝'],
            ['Other legally authorised caregiver', 'caregiver', '💙'],
          ],
          other: 'caregiver',
        },
        {
          n: 'parent-marital',
          q: 'What is your marital status?',
          kind: 'choice',
          req: true,
          // identical values to the Studio's `relationship` question
          o: [
            ['Single, never married', 'Single, never married', '🧍'],
            ['Married', 'Married', '💍'],
            ['Separated, divorced or widowed', 'Separated, divorced or widowed', '🕊️'],
            ['Domestic partnership / living with someone', 'Domestic partnership/living with someone', '🏠'],
            ['Prefer not to say', 'Prefer not to say', '🤐'],
          ],
        },
        {
          n: 'P04',
          q: 'Are you legally authorised to give permission for this teenager to take part?',
          help: 'Only a parent or a legally authorised guardian can give this permission.',
          kind: 'choice',
          req: true,
          gate: true, // 'no' stops the flow, 'unsure' sends the record for manual review
          o: [
            ['Yes, I am', 'yes', '✅'],
            ['No, I am not', 'no', '🚫'],
            ['I am not sure', 'unsure', '🤔'],
          ],
        },
        {
          n: 'P11',
          q: 'How many children aged 13–17 are you parenting?',
          kind: 'choice',
          req: true,
          o: [
            ['1', '1', '🧒'],
            ['2', '2', '👫'],
            ['3', '3', '👨‍👩‍👧'],
            ['4 or more', '4+', '👨‍👩‍👧‍👦'],
          ],
        },
      ],
    },

    // ───────────────────────── how we reach you ─────────────────────────
    {
      name: 'Staying in touch',
      icon: '📬',
      qs: [
        {
          n: 'P06',
          q: 'Which language would you like us to write to you in?',
          kind: 'language',
          req: true,
        },
        {
          n: 'P07',
          q: 'How would you prefer us to contact you?',
          help: 'Choose as many as suit you.',
          kind: 'choice',
          multi: true,
          req: true,
          o: [
            ['Email', 'email', '✉️'],
            ['SMS', 'sms', '💬'],
            ['Phone call', 'call', '📞'],
            ['WhatsApp, where lawful', 'whatsapp', '🟢'],
          ],
        },
        {
          n: 'P08',
          q: 'What is your email address?',
          help: 'Consent confirmations and anything that needs your approval go here.',
          kind: 'email',
          req: true,
        },
        {
          n: 'P09',
          q: 'What is your mobile number?',
          help: 'Pick your country first — its flag and dial code fill in for you.',
          kind: 'phone',
          req: false,
          // required as soon as SMS, a phone call or WhatsApp is one of the choices
          reqWhen: (a) => (Array.isArray(a.P07) ? a.P07 : [a.P07]).some((v) => ['sms', 'call', 'whatsapp'].includes(v)),
        },
        {
          n: 'P12',
          q: 'Would you like to receive panel administration messages?',
          help: 'Policy changes, consent renewals and account notices. Messages required by law are sent either way.',
          kind: 'choice',
          req: true,
          o: [
            ['Yes, keep me updated', 'yes', '🔔'],
            ['No, only what is required', 'no', '🔕'],
          ],
        },
      ],
    },

    // ─────────────────── optional: teen health & caregiving ───────────────────
    {
      name: 'Your teen’s health',
      icon: '💚',
      optional: true,
      intro: {
        art: 'care',
        kicker: 'About your child’s health',
        title: 'Three questions that keep your child safe on the panel.',
        body:
          'These questions are about your teenager’s health, and they matter more than anything else on this page. '
          + 'They are the only way we can keep studies about medicines, food, allergies or conditions away from a child '
          + 'they could upset or harm. Parents who answer them get a safer, better-matched panel for their child. '
          + 'It takes under a minute.',
        reasons: [
          ['🛡️', 'Unsafe studies are blocked for your child',
            'A product test with an allergen, a diet study or a survey about a condition your child lives with can be '
            + 'stopped before it ever reaches them — but only if we know. Left blank, we cannot protect them from it.'],
          ['🩺', 'Health research that suits them, and pays more',
            'Studies that need teenagers with a particular condition are rarer, longer and better rewarded. With this '
            + 'section blank, your teen is never matched to one.'],
          ['🤲', 'Caregiver studies, paid to you',
            'If you look after your teen’s health, you become eligible for caregiver research answered by you and '
            + 'rewarded to you.'],
        ],
        assurance:
          'Stored apart from everything else, never shown to a client in a way that identifies your child, and every '
          + 'question has a “Prefer not to disclose” answer. You stay in control.',
        startLabel: 'Protect my child — answer now',
        skipLabel: 'Skip for now',
        // the second, gentler ask shown when Skip is pressed
        confirm: {
          title: 'Are you sure? This is the part that protects your child.',
          body:
            'Without these answers we cannot screen out studies that could be unsuitable for your teen’s health. '
            + 'It is three quick questions, and “Prefer not to disclose” is always an option.',
          stay: 'Answer the 3 questions',
          leave: 'Skip anyway',
        },
        skipNote: 'You can come back to this section at any time from your profile.',
      },
      qs: [
        {
          n: 'HQ1',
          q: 'Does your teen currently have a diagnosed or long-term health condition?',
          kind: 'choice',
          multi: true,
          req: false,
          o: [
            ['Asthma or other respiratory condition', 'respiratory', '🫁'],
            ['Diabetes', 'diabetes', '🩸'],
            ['Heart or cardiovascular condition', 'cardio', '❤️'],
            ['Epilepsy or seizure disorder', 'epilepsy', '⚡'],
            ['Allergy or chronic allergic condition', 'allergy', '🤧'],
            ['Skin condition, such as eczema or psoriasis', 'skin', '🧴'],
            ['Gastrointestinal or digestive condition', 'gastro', '🍽️'],
            ['Neurological condition', 'neuro', '🧠'],
            ['Physical disability or mobility-related condition', 'mobility', '♿'],
            ['Developmental condition', 'developmental', '🧩'],
            ['Mental or behavioural health condition', 'mental', '🫂'],
            ['Other diagnosed medical condition', 'other', '📋'],
            ['None of these', 'none', '💪'],
            ['Prefer not to disclose', 'na', '🤐'],
          ],
          other: 'other',
          exclusive: ['none', 'na'],
        },
        {
          n: 'HQ2',
          q: 'Are you currently a caregiver for your teen in relation to a health condition, disability or ongoing health need?',
          kind: 'choice',
          req: false,
          o: [
            ['Yes, I am the primary caregiver', 'primary', '🤲'],
            ['Yes, I share caregiving responsibilities', 'shared', '🤝'],
            ['No, I am not a caregiver', 'no', '🙂'],
            ['No, another person is primarily responsible', 'other-person', '👥'],
            ['Not applicable', 'na-applicable', '➖'],
            ['Prefer not to answer', 'na', '🤐'],
          ],
        },
        {
          n: 'HQ4',
          q: 'Do you regularly help your teen with any of the following?',
          kind: 'choice',
          multi: true,
          req: false,
          when: (a) => ['primary', 'shared'].includes(a.HQ2),
          o: [
            ['Managing medication or treatment', 'medication', '💊'],
            ['Attending medical appointments', 'appointments', '🏥'],
            ['Managing daily activities because of a health condition', 'daily', '🗓️'],
            ['Monitoring symptoms or health needs', 'monitoring', '📈'],
            ['Coordinating healthcare or support services', 'coordinating', '📞'],
            ['Providing emotional or behavioural support', 'emotional', '💙'],
            ['None of the above', 'none', '➖'],
            ['Prefer not to answer', 'na', '🤐'],
          ],
          exclusive: ['none', 'na'],
        },
      ],
    },
  ],
};

export default PARENT_SURVEY;
