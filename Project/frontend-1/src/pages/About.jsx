import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import { asset } from '../config/env.js';
import { SITE } from '../config/site.js';
import { CtaBand, PageHero, SectionHead } from '../components/Common.jsx';
import FlagCarousel from '../components/sections/FlagCarousel.jsx';
import Icon from '../components/Icon.jsx';
import { FrLogo, T2OMark } from '../components/Brand.jsx';

// About hero: brands ask → consumers & professionals answer through the Turn2Opinion hub → rewards flow back.
function OpinionHub() {
  return (
    <div className="ohub" aria-hidden="true">
      <svg className="ohub-paths" viewBox="0 0 100 100">
        <path className="p-ask" d="M50 15 C 50 26, 50 30, 50 38" />
        <path className="p-in" d="M17 45 Q 30 34 39 47" />
        <path className="p-in" d="M83 45 Q 70 34 61 47" />
        <path className="p-out" d="M50 62 C 50 70, 50 74, 50 80" />
        <path className="p-back" d="M40 88 Q 14 88 12 55" />
        <path className="p-back" d="M60 88 Q 86 88 88 55" />
      </svg>
      <span className="ohub-core">
        <span className="ohub-ring" />
        <span className="ohub-ring r2" />
        <T2OMark size={70} />
      </span>
      <span className="ohub-node n-brand">
        <Icon name="megaphone" size={16} /> Brands ask
      </span>
      <span className="ohub-node n-con">
        <Icon name="users" size={16} /> Consumers
        <span className="ohub-sats">
          {['cap', 'heart', 'game'].map((ic, i) => (
            <i key={ic} style={{ '--i': i }}>
              <Icon name={ic} size={12} />
            </i>
          ))}
        </span>
      </span>
      <span className="ohub-node n-pro">
        <Icon name="briefcase" size={16} /> Professionals
        <span className="ohub-sats">
          {['chip', 'pulse', 'bank'].map((ic, i) => (
            <i key={ic} style={{ '--i': i }}>
              <Icon name={ic} size={12} />
            </i>
          ))}
        </span>
      </span>
      <span className="ohub-node n-reward">
        <Icon name="gift" size={16} /> Rewards
      </span>
      <span className="ohub-chips">
        {['PayPal', 'Wire', 'Gift card', 'UPI · India'].map((m, i) => (
          <b key={m} style={{ '--i': i }}>
            {m}
          </b>
        ))}
      </span>
    </div>
  );
}

export default function About() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <PageHero
        theme="night"
        crumbs={[{ label: 'About' }]}
        kicker="Who we are"
        title="About Turn2Opinion"
        tagline="Where everyday opinions become real rewards."
        lead="We connect people who have something to say with the companies, agencies and public bodies that genuinely want to hear it – and we make sure you’re paid for your time."
        art={<OpinionHub />}
      />

      <section className="section s-paper" aria-labelledby="bridge-h">
        <div className="wrap">
          <SectionHead id="bridge-h" title="Your answer, their decision" align="center" />
          <div className="bridge" data-reveal>
            <div className="bridge-side">
              {['Brands', 'Governments', 'Agencies', 'Institutions'].map((t, i) => (
                <span key={t} className="bridge-chip" style={{ '--i': i }}>
                  <Icon name={['bag', 'landmark', 'megaphone', 'cap'][i]} size={16} /> {t}
                </span>
              ))}
              <p>ask the questions</p>
            </div>
            <div className="bridge-core">
              <span className="bridge-beam b-left" />
              <span className="bridge-hub">
                <img src={asset('/images/brand/turn2opinion-logo-320.webp')} alt="Turn2Opinion logo" width="140" height="43" loading="lazy" />
              </span>
              <span className="bridge-beam b-right" />
            </div>
            <div className="bridge-side">
              {['Consumers', 'Professionals', 'Decision-makers', 'Specialists'].map((t, i) => (
                <span key={t} className="bridge-chip alt" style={{ '--i': i }}>
                  <Icon name={['users', 'briefcase', 'target', 'sparkles'][i]} size={16} /> {t}
                </span>
              ))}
              <p>share answers & get rewarded</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section s-mist" aria-labelledby="story-h">
        <div className="wrap story">
          <div data-reveal>
            <h2 id="story-h">Part of Frequent Research</h2>
            <p>
              Turn2Opinion is the consumer and business community of <strong>Frequent Research Fieldwork Solutions Private Limited</strong>,
              an online market research and full-service research company headquartered in New Delhi, India.
            </p>
            <p>
              We are shaping one of the world’s most versatile consumer and business communities, giving organisations access to quality
              respondents of their choice – and giving our members a fair, rewarding way to be heard.
            </p>
            <p>
              We offer surveys for brands, governments, agencies and institutions, and reward members with a choice of PayPal, wire transfer
              or Amazon gift vouchers – plus UPI for members in India. Surveys are interesting, short and fun – and work on mobile as well as desktop.
            </p>
          </div>
          <div className="story-logo" data-reveal>
            <FrLogo width={280} />
          </div>
        </div>
      </section>

      <section className="section s-night" aria-labelledby="values-h">
        <div className="wrap">
          <SectionHead id="values-h" title="What we stand for" align="center" />
          <div className="values">
            {[
              ['heart', 'Respect for your time', 'Short, relevant surveys and honest information about rewards before you start.', '#FF5C7A'],
              ['lock', 'Privacy by default', 'Your details are never sold or shared. Answers are reported in aggregate.', '#49B6FF'],
              ['shield', 'Quality without compromise', 'Strict checks protect honest members and the clients who rely on them.', '#12C29B'],
              ['globe', 'Open to everyone', 'Consumers and professionals in every region, every age and every walk of life.', '#FFB020'],
              ['headset', 'Help that answers', 'Live help 24/7, WhatsApp and email support with real follow-through.', '#7B5CFF'],
              ['gift', 'Rewards your way', 'PayPal, wire transfer or gift cards worldwide – plus UPI in India.', '#1F5BFF']
            ].map(([ic, t, d, c], i) => (
              <div key={t} className="value" style={{ '--c': c, '--i': i }} data-reveal>
                <span className="value-icon">
                  <Icon name={ic} size={24} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="cert-h">
        <div className="wrap">
          <SectionHead id="cert-h" title="Checked by people who aren’t us" lead="Independent certifications and memberships that hold us to account." />
          <ul className="cert-wall">
            {SITE.certifications.map((c, i) => (
              <li key={c.id} style={{ '--i': i }} data-reveal>
                <span className="cert-medal">
                  <Icon name={c.id === 'esomar' ? 'globe' : c.id === 'msme' ? 'landmark' : 'shield'} size={26} />
                </span>
                <strong>{c.label}</strong>
                <span>{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gateway to the full ratings & reviews page (v3.1). Kept here, under About, because what
          members say about us belongs with who we are rather than on a marketing page. */}
      <section className="section s-paper" aria-labelledby="rv-gate-h">
        <div className="wrap">
          <Link to="/about/reviews/" className="rv-gate" data-reveal>
            <span className="rvg-art" aria-hidden="true">
              <span className="rvg-orb" />
              <span className="rvg-ring r1" />
              <span className="rvg-ring r2" />
              <span className="rvg-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className="rvg-copy">
              <span className="rvg-kicker">
                <Icon name="pulse" size={14} /> Judged by the people who use it
              </span>
              <h2 id="rv-gate-h">Read every rating and review</h2>
              <p>
                The average score, how members rate surveys, rewards, support and mobile separately, and every review in
                full — with the country each one came from. Low scores included.
              </p>
            </span>
            <span className="rvg-go" aria-hidden="true">
              <Icon name="arrow" size={20} />
            </span>
          </Link>
        </div>
      </section>

      <section className="section s-board" aria-labelledby="reach2-h">
        <div className="wrap">
          <SectionHead id="reach2-h" title="Where our members are" align="center" />
          <FlagCarousel />
          <p className="center-link light" data-reveal>
            Have a question for us? <Link to="/contact/">Contact Turn2Opinion</Link>.
          </p>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
