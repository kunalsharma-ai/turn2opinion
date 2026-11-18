import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import { asset } from '../config/env.js';
import { CtaBand, FlipFaq, PageHero, SectionHead } from '../components/Common.jsx';
import SurveyMachine from '../components/sections/SurveyMachine.jsx';
import Icon from '../components/Icon.jsx';
import { PAID_SURVEY_FAQS as FAQS } from '../data/page-faqs.js';
import { peopleAlt } from '../data/illustrations.js';

const SURVEY_TYPES = {
  consumer: [
    ['bag', 'Shopping habits', 'Share how you choose stores, brands and products so retailers improve what they sell.'],
    ['phone', 'Technology & apps', 'Rate the apps, devices and AI tools you use every day.'],
    ['cup', 'Food & lifestyle', 'Tell brands about meals, restaurants and everyday choices.'],
    ['plane', 'Travel experience', 'Help shape airlines, hotels and travel services.'],
    ['play', 'Entertainment', 'Movies, shows, games and music – your taste counts.'],
    ['heart', 'Consumer opinion', 'Honest views on products and services across categories.']
  ],
  business: [
    ['chip', 'IT & software', 'Cloud, cybersecurity, SaaS and hardware buying decisions.'],
    ['bank', 'Finance & banking', 'Business banking, payments, insurance and fintech.'],
    ['users', 'HR & workplace', 'Hiring, benefits, learning and hybrid work.'],
    ['pulse', 'Healthcare', 'Clinical practice, medicines, devices and patient care.'],
    ['truck', 'Operations & supply chain', 'Logistics, procurement and manufacturing.'],
    ['megaphone', 'Marketing & media', 'Advertising, brand and digital marketing.']
  ]
};



function CardStack() {
  return (
    <div className="card-stack" aria-hidden="true">
      {[
        ['Technology & Apps', 'phone', '#1F5BFF'],
        ['Shopping Habits', 'bag', '#FF5C7A'],
        ['B2B: Cloud tools', 'chip', '#7B5CFF']
      ].map(([t, ic, c], i) => (
        <div key={t} className="stack-card" style={{ '--i': i, '--c': c }}>
          <span className="stack-icon">
            <Icon name={ic} size={20} />
          </span>
          <strong>{t}</strong>
          <span className="stack-bar">
            <i />
          </span>
          <span className="stack-foot">
            <Icon name="clock" size={12} /> Short · <Icon name="gift" size={12} /> Rewarded
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PaidSurveys() {
  const ref = useReveal();
    return (
    <div ref={ref}>
      <PageHero
        theme="grid"
        crumbs={[{ label: 'Paid Surveys' }]}
        kicker="Get paid to do surveys"
        title="Paid Online Surveys"
        tagline="Your everyday choices are worth more than you think."
        lead="Share your genuine opinion on products, services and workplace topics – and earn rewards for every completed survey. Free to join, no investment needed."
        art={<CardStack />}
      >
        <div className="ph-actions">
          <Link to="/join/" className="btn btn-gold">
            Get my first survey
          </Link>
          <Link to="/rewards/" className="btn btn-glass">
            See rewards
          </Link>
        </div>
      </PageHero>

      <section className="section s-paper" aria-labelledby="what-h">
        <div className="wrap define">
          <div data-reveal>
            <h2 id="what-h">What are paid online surveys?</h2>
            <p>
              Paid online surveys are questionnaires that companies, researchers and public bodies use to understand what real people
              think. Because honest opinions are valuable, research companies like Turn2Opinion reward members with points that turn into
              cash or gift cards.
            </p>
            <p>
              It’s one of the simplest ways to earn money online without investment: no special skills, no equipment beyond your phone, and
              you decide when to take part.
            </p>
          </div>
          <div className="relay" data-reveal aria-label="How a paid survey works">
            <span className="relay-line" aria-hidden="true">
              <i />
            </span>
            {[
              ['megaphone', 'Who pays?', 'Brands, agencies, governments and institutions running research.', '#7B5CFF'],
              ['chat', 'What do you do?', 'Answer questions honestly – usually in a few minutes.', '#1F5BFF'],
              ['gift', 'What do you get?', 'Points you redeem via PayPal, cash, bank or wire transfer, vouchers or gift cards – plus UPI in India.', '#C76A00']
            ].map(([ic, t, d, c], i) => (
              <div key={t} className="relay-st" style={{ '--c': c, '--i': i }}>
                <span className="relay-ico">
                  <Icon name={ic} size={22} />
                </span>
                <div>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section s-mist" aria-labelledby="types-h">
        <div className="wrap">
          <SectionHead id="types-h" title="Surveys for consumers and professionals" lead="Two moving worlds of research. Hover to pause – most members end up in both." />
          <div className="escal">
            {['consumer', 'business'].map((k) => (
              <div key={k} className={`esc esc-${k}`}>
                <div className="esc-head">
                  <span className="esc-peep" aria-hidden="true">
                    <img
                      src={asset(`/images/people/${k === 'consumer' ? 'shopper' : 'business'}.svg`)}
                      alt={peopleAlt(k === 'consumer' ? 'shopper' : 'business')}
                      width="120"
                      height="140"
                      loading="lazy"
                    />
                  </span>
                  <div>
                    <h3>{k === 'consumer' ? 'Consumer surveys' : 'Business surveys'}</h3>
                    <p>{k === 'consumer' ? 'For everyday life – shopping, apps, food, travel and fun.' : 'For your working life – the tools, vendors and decisions you know.'}</p>
                  </div>
                </div>
                <div className="esc-belt">
                  <ul className="esc-track">
                    {[...SURVEY_TYPES[k], ...SURVEY_TYPES[k]].map(([ic, t, d], i) => (
                      <li key={i} aria-hidden={i >= SURVEY_TYPES[k].length || undefined} style={{ '--i': i % SURVEY_TYPES[k].length }}>
                        <span className="esc-ico">
                          <Icon name={ic} size={20} />
                        </span>
                        <span>
                          <strong>{t}</strong>
                          <small>{d}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <span className="esc-and" aria-hidden="true">
              <b>+</b>
              <small>join both</small>
            </span>
          </div>
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="elig-h">
        <div className="wrap funnel-wrap">
          <div data-reveal>
            <h2 id="elig-h">How survey eligibility works</h2>
            <p>
              Every study is looking for a particular group – say, parents who shop online, or IT managers at mid-size companies. Your
              profile helps us invite you to the right surveys, and a few screening questions confirm the match.
            </p>
            <p>
              If you don’t qualify, it isn’t a mark against you – it simply means that study needs someone different. Keeping your{' '}
              <Link to="/profiling/">survey profile</Link> complete is the best way to qualify more often.
            </p>
          </div>
          <div className="sieve" data-reveal>
            <div className="sieve-drops" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <i key={i} className={`drop lv${[4, 1, 3, 2, 4, 1, 3, 4, 2, 4, 1, 3, 4, 2][i]}`} style={{ '--x': `${8 + ((i * 37) % 84)}%`, '--i': i }} />
              ))}
            </div>
            {[
              ['Profile matched', 'Your profile fits the study brief', 'id'],
              ['Invitation sent', 'Dashboard, SMS, WhatsApp or email', 'bell'],
              ['Screening questions', 'A few quick checks confirm the fit', 'filter'],
              ['Survey completed', 'Points added to your balance', 'coin']
            ].map(([t, d, ic], i) => (
              <div key={t} className="sieve-layer" style={{ '--i': i }}>
                <span className="sieve-mesh" aria-hidden="true" />
                <span className="sieve-ico">
                  <Icon name={ic} size={18} />
                </span>
                <span className="sieve-txt">
                  <strong>{t}</strong>
                  <small>{d}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section s-gold" aria-labelledby="top-h">
        <div className="wrap">
          <SectionHead id="top-h" title="Browse a few of our paid surveys" lead="Consumer and professional surveys with their typical reward and length. Press a slot to see the details." />
          <SurveyMachine />
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="rew-h">
        <div className="wrap reward-strip" data-reveal>
          <div>
            <h2 id="rew-h">How rewards work</h2>
            <p>
              Each survey shows its reward up front. Points collect in your dashboard; once you reach the threshold you can claim through
              your preferred method. <Link to="/rewards/">Explore survey rewards</Link>.
            </p>
          </div>
          <ul className="method-pills">
            {['PayPal', 'Cash Rewards', 'Bank Transfer', 'Wire Transfer', 'Shopping Vouchers', 'Grocery Vouchers', 'Digital Gift Cards', 'UPI (India only)'].map((m) => (
              <li key={m}>
                <Icon name="gift" size={16} /> {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section s-mist" aria-labelledby="pfaq-h">
        <div className="wrap">
          <div data-reveal className="section-head">
            <h2 id="pfaq-h">Paid surveys: quick questions</h2>
            <p className="sh-lead">
              More in our <Link to="/faq/">full FAQ</Link> or the <Link to="/blog/paid-surveys-complete-guide/">complete guide to paid surveys</Link>.
            </p>
          </div>
          <FlipFaq items={FAQS} colors={['#1F5BFF', '#FF5C7A', '#0E9F6E', '#7B5CFF']} />
        </div>
      </section>

      <CtaBand title="Start sharing your opinion today." variant="lagoon" />
    </div>
  );
}
