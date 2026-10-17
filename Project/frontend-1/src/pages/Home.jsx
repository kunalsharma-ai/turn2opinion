import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import Icon from '../components/Icon.jsx';
import { CtaBand, SectionHead } from '../components/Common.jsx';
import QuickAnswers from '../components/sections/QuickAnswers.jsx';
import { StepsPipeline, TopicsBento } from '../components/sections/Flow.jsx';
import ProfilesExplorer from '../components/sections/ProfilesExplorer.jsx';
import FlagCarousel from '../components/sections/FlagCarousel.jsx';
import CredentialScanner from '../components/sections/CredentialScanner.jsx';
import HomeHero from '../components/sections/HeroStage.jsx';
import { ClaimJourney, InvitationChannels, RewardRoutes, RewardWallet } from '../components/sections/Rewards.jsx';
import { PrivacyVault, SecurityHive, VerificationStack } from '../components/sections/Security.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { BLOG_POSTS } from '../data/blog/index.js';
import { FAQ_GROUPS } from '../data/faqs.js';

const MARQUEE = ['Paid online surveys', 'Earn money online without investment', 'Online work from home', 'Paid surveys for cash', 'B2B surveys for professionals', 'PayPal · Wire · Gift cards · UPI in India', 'Free to join', 'Get paid to do surveys'];

export default function Home() {
  const ref = useReveal();
  const trending = BLOG_POSTS.filter((p) => p.trending).slice(0, 4);
  const faqs = FAQ_GROUPS.flatMap((g) => g.items).slice(0, 5);
  return (
    <div ref={ref} className="home">
      <HomeHero />

      <div className="ribbons" aria-hidden="true">
        {[0, 1].map((r) => (
          <div key={r} className={`ribbon rb${r}`}>
            <div className="ribbon-track">
              {[...MARQUEE, ...MARQUEE].map((m, i) => (
                <span key={i}>
                  {m}
                  <Icon name={r ? 'coin' : 'sparkles'} size={18} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section className="section s-night" aria-labelledby="how-title">
        <div className="wrap">
          <SectionHead id="how-title" title="From free sign-up to your first reward" lead="Sign up, answer honestly, get paid. That really is the whole thing – and it never costs you a rupee, dollar or euro." align="center" />
          <StepsPipeline />
          <p className="center-link" data-reveal>
            <Link to="/how-it-works/" className="link-arrow">
              Learn how paid online surveys work <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      {/* TOPICS */}
      <section className="section s-paper" aria-labelledby="topics-title">
        <div className="wrap split-head">
          <SectionHead id="topics-title" title="Surveys on things you already know" lead="Nobody expects you to be an expert. If you shop, scroll, eat out, travel or go to work, you already have answers brands are looking for." />
          <Link to="/paid-surveys/" className="btn btn-ink" data-reveal>
            Explore paid surveys
          </Link>
        </div>
        <div className="wrap">
          <TopicsBento />
        </div>
      </section>

      {/* PROFILES */}
      <section className="section s-mist" aria-labelledby="who-title">
        <div className="wrap">
          <SectionHead id="who-title" title="Who we invite? Honestly, almost everyone" lead="From C-suite leaders and IT decision-makers to students, gamers and pet parents – profiles across industries, departments, job titles, demographics and lifestyles." />
          <ProfilesExplorer />
        </div>
      </section>

      {/* GLOBAL */}
      <section className="section s-board" aria-labelledby="reach-title">
        <div className="wrap">
          <SectionHead id="reach-title" title="One community, flags from five regions" lead="Members join from North and South America, Europe, Asia Pacific, the Middle East and Africa. Pick a region to spin its flags." align="center" />
          <FlagCarousel />
        </div>
      </section>

      {/* INVITATIONS */}
      <section className="section s-paper" aria-labelledby="inv-title">
        <div className="wrap">
          <SectionHead kicker="Survey invitations" id="inv-title" title="Hear about new surveys the way you like" lead="Pick how we reach you. When a survey fits your profile, you’ll know about it – and you can switch channels any time." />
          <InvitationChannels />
        </div>
      </section>

      {/* REWARDS */}
      <section className="section s-gold" aria-labelledby="rw-title">
        <div className="wrap">
          <SectionHead kicker="Rewards" id="rw-title" title="Get paid the way that suits you" lead="PayPal, a bank transfer or an Amazon gift card – and UPI if you live in India. You choose when you cash out." />
          <RewardWallet />
          <div className="routes-block" data-reveal>
            <h3 className="sub-h">Every profile has a way to earn</h3>
            <RewardRoutes />
          </div>
          <div className="journey-block" data-reveal>
            <h3 className="sub-h">Your reward journey</h3>
            <ClaimJourney />
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section className="section s-indigo" aria-labelledby="q-title">
        <div className="wrap">
          <SectionHead id="q-title" title="18 checks stand between bots and your rewards" lead="Bots and copy-paste answers spoil things for everyone. These checks keep them out, so genuine members qualify more often." align="center" />
          <SecurityHive />
          <div className="verify-grid">
            <div data-reveal>
              <h3 className="sub-h light">Verification & validation protocols</h3>
              <p className="muted-light">Multi-layer authentication protects every account and every response.</p>
              <VerificationStack />
            </div>
            <PrivacyVault />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section s-sky" aria-labelledby="t-title">
        <div className="wrap">
          <SectionHead id="t-title" title="Hear it from members" lead="Real reviews from real members. Post yours and it shows up here straight away." />
          <Testimonials />
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section s-paper" aria-labelledby="wwa-title">
        <div className="wrap wwa">
          <div className="wwa-copy" data-reveal>
            <h2 id="wwa-title">A real research company stands behind us</h2>
            <p>
              Turn2Opinion belongs to <strong>Frequent Research Fieldwork Solutions Private Limited</strong>, a full-service market research
              firm in New Delhi. When a brand, a government department or an agency needs to know what people really think, we run the
              study – and the people who answer get rewarded.
            </p>
            <p>
              You can look us up, check our certificates and call our office. Surveys work on your phone, tablet or laptop, so you can
              answer on the bus or on the sofa.
            </p>
            <Link to="/about/" className="link-arrow">
              About Turn2Opinion <Icon name="arrow" size={16} />
            </Link>
          </div>
          <CredentialScanner />
        </div>
      </section>

      {/* BLOGS */}
      <section className="section s-mist" aria-labelledby="blog-title">
        <div className="wrap split-head">
          <SectionHead id="blog-title" title="Trending on the blog" lead="Plain-talking guides on earning money online, paid surveys for cash and working from home without investment." />
          <Link to="/blog/" className="btn btn-ink" data-reveal>
            All blogs
          </Link>
        </div>
        <div className="wrap blog-mag">
          {trending.map((p, i) => (
            <BlogCard key={p.slug} post={p} variant={i === 0 ? 'feature' : 'mini'} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section s-paper" aria-labelledby="faq-title">
        <div className="wrap">
          <div className="qa-head" data-reveal>
            <div>
              <h2 id="faq-title">Quick answers</h2>
              <p className="sh-lead">Pick a question and get a straight answer. Live help answers 24/7.</p>
            </div>
            <Link to="/faq/" className="btn btn-ink">
              All FAQs <Icon name="arrow" size={16} />
            </Link>
          </div>
          <QuickAnswers items={faqs} idPrefix="home-faq" />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
