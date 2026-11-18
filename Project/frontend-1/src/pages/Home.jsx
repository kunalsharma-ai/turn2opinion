import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import Icon from '../components/Icon.jsx';
import { CtaBand, SectionHead } from '../components/Common.jsx';
import QuickAnswers from '../components/sections/QuickAnswers.jsx';
import { StepsPipeline } from '../components/sections/Flow.jsx';
import SurveyMachine from '../components/sections/SurveyMachine.jsx';
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

const MARQUEE = ['Paid online surveys', 'Earn money online without investment', 'Online work from home', 'Paid surveys for cash', 'B2B surveys for professionals', 'PayPal · Cash · Bank · Wire · Vouchers · Gift cards · UPI in India', 'Free to join', 'Get paid to do surveys'];

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
          <SectionHead id="how-title" title="How paid online surveys work: free sign-up to your first reward" lead="Sign up, answer honestly, get paid. That really is the whole thing – and it never costs you a rupee, dollar or euro." align="center" />
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
          <SectionHead
            id="topics-title"
            title="We value your feedback – your opinion gets rewarded"
            lead="Browse a few of our paid surveys. Every one shows its reward and length before you start – and you learn something new along the way."
          />
          <Link to="/paid-surveys/" className="btn btn-ink" data-reveal>
            Explore paid surveys
          </Link>
        </div>
        <div className="wrap">
          <SurveyMachine />
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
          <SectionHead kicker="Rewards" id="rw-title" title="Get paid the way that suits you" lead="Eight ways to get paid: PayPal, cash rewards, bank or wire transfer, shopping and grocery vouchers, digital gift cards – and UPI if you live in India. You choose when you cash out." />
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

      {/* TESTIMONIALS — the Opinion Atlas is a dark, cinematic stage, so the section carries the
          night grade rather than the old pale sky one. */}
      <section className="section s-night" aria-labelledby="t-title">
        <div className="wrap">
          <SectionHead
            id="t-title"
            kicker="Member voices"
            title="Hear it from members, wherever they answered from"
            lead="Every review below is from a member we hold a record for — with their country, their role and the score they actually gave. Post yours and it lands here straight away."
          />
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

      {/* EARN ONLINE — the plain-language summary of what Turn2Opinion is, written around the
          searches people actually make (paid surveys for cash, earn money online without
          investment, online work from home). Crawlers and AI assistants read this block first. */}
      <section className="section s-mist seo-intro" aria-labelledby="earn-title">
        <div className="wrap">
          <SectionHead
            id="earn-title"
            kicker="Paid online surveys"
            title="Earn money online without investment, one survey at a time"
            lead="Turn2Opinion pays real people for honest opinions. There is no joining fee, nothing to buy and nothing to sell – you answer paid online surveys, collect points and cash them out."
          />
          <div className="seo-intro-grid">
            <article data-reveal>
              <h3>Paid surveys for cash, vouchers and gift cards</h3>
              <p>
                Every survey shows its reward and how long it takes before you start. Points add up in your account and you redeem them
                through PayPal, cash rewards, a bank or wire transfer, shopping or grocery vouchers, a digital gift card or, if you live in India, straight to your UPI ID. You pick the
                payout and the moment you cash out.
              </p>
            </article>
            <article data-reveal>
              <h3>Online work from home that fits around your day</h3>
              <p>
                Surveys run on your phone, tablet or laptop, so you can answer on a break, on the bus or after the kids are asleep. Each one
                shows its length up front, so you pick the ones that fit the time you have. Students, homemakers, retirees and full-time workers all use Turn2Opinion as a
                flexible side income, not a full-time job.
              </p>
            </article>
            <article data-reveal>
              <h3>Surveys for consumers and business professionals</h3>
              <p>
                Consumers share views on shopping, food, travel, technology, health and finance. Managers, IT decision-makers, doctors and
                other professionals get B2B surveys about the tools and services they use at work, which usually pay more because fewer
                people qualify.
              </p>
            </article>
            <article data-reveal>
              <h3>Why brands pay for your opinion</h3>
              <p>
                Companies, agencies and public bodies commission market research before they launch a product, change a price or run a
                campaign. Turn2Opinion is run by Frequent Research, an ISO-certified research company in New Delhi, so the studies you
                take are real projects and every answer is protected by our privacy policy.
              </p>
            </article>
          </div>
          <p className="center-link seo-intro-links" data-reveal>
            <Link to="/paid-surveys/" className="link-arrow">
              Browse paid online surveys <Icon name="arrow" size={16} />
            </Link>
            <Link to="/blog/earn-money-online-without-investment/" className="link-arrow">
              How to earn money online without investment <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      {/* BLOGS */}
      <section className="section s-mist" aria-labelledby="blog-title">
        <div className="wrap split-head">
          <SectionHead id="blog-title" title="Earn money online: trending guides on the blog" lead="Plain-talking guides on earning money online, paid surveys for cash and working from home without investment." />
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
              <h2 id="faq-title">Paid surveys for cash: quick answers</h2>
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
