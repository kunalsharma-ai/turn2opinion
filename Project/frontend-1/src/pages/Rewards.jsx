import { Link } from '../router/Router.jsx';
import { useReveal } from '../hooks/useMounted.js';
import { ChatFaq, CtaBand, PageHero, SectionHead } from '../components/Common.jsx';
import { ClaimJourney, PayoutTracker, RewardRoutes, RewardWallet } from '../components/sections/Rewards.jsx';
import { FAQ_GROUPS } from '../data/faqs.js';
import Icon from '../components/Icon.jsx';

function CoinFountain() {
  return (
    <div className="fountain" aria-hidden="true">
      <div className="fountain-jar">
        <span className="jar-fill" />
        <span className="jar-label">
          <Icon name="trophy" size={22} />
        </span>
      </div>
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="f-coin" style={{ '--i': i }}>
          <Icon name="coin" size={18} />
        </span>
      ))}
    </div>
  );
}

export default function Rewards() {
  const ref = useReveal();
  const faqs = FAQ_GROUPS.find((g) => g.id === 'rewards').items;
  return (
    <div ref={ref}>
      <PageHero
        theme="waves"
        crumbs={[{ label: 'Rewards' }]}
        kicker="Get rewarded your way"
        title="Survey Rewards"
        tagline="Earn it your way. Redeem it your way."
        lead="Every completed survey adds points to your balance. Redeem them through secure, convenient payment methods that suit you."
        art={<CoinFountain />}
      />

      <section className="section s-paper" aria-labelledby="methods-h">
        <div className="wrap">
          <SectionHead id="methods-h" title="Eight ways to get paid" lead="Tell us where you live and we’ll deal the cards that apply to you." />
          <RewardWallet />
        </div>
      </section>

      <section className="section s-night" aria-labelledby="journey-h">
        <div className="wrap">
          <SectionHead id="journey-h" title="From survey to payout" lead="Complete surveys, earn rewards, and claim your eligible rewards with ease." align="center" />
          <ClaimJourney />
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="points-h">
        <div className="wrap points">
          <div data-reveal>
            <h2 id="points-h">How points add up</h2>
            <p>You earn points in two ways – and both count toward your redemption threshold.</p>
            <ul className="points-list">
              <li>
                <span className="pl-icon pi-blue">
                  <Icon name="id" size={20} />
                </span>
                <div>
                  <strong>Completing profile sections</strong>
                  <p>Each profile section you complete and validate earns points, and unlocks more matching surveys.</p>
                </div>
              </li>
              <li>
                <span className="pl-icon pi-gold">
                  <Icon name="chat" size={20} />
                </span>
                <div>
                  <strong>Completing surveys</strong>
                  <p>The reward for each survey is shown in your dashboard before you start, based on its length and topic.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="meter" data-reveal aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" className="meter-bg" />
              <circle cx="100" cy="100" r="80" className="meter-profile" />
              <circle cx="100" cy="100" r="80" className="meter-survey" />
            </svg>
            <div className="meter-center">
              <Icon name="target" size={28} />
              <span>Threshold</span>
            </div>
            <div className="meter-key">
              <span className="k-blue">Profile points</span>
              <span className="k-gold">Survey points</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section s-mist" aria-labelledby="avail-h">
        <div className="wrap">
          <SectionHead id="avail-h" title="What happens after you claim" lead="Follow your claim like a parcel. Payment options depend on your country’s rules and provider coverage – your dashboard always shows the ones that apply to you." />
          <PayoutTracker />
        </div>
      </section>

      <section className="section s-gold" aria-labelledby="routes-h">
        <div className="wrap">
          <SectionHead id="routes-h" title="Every profile has a way to earn" lead="Consumers and professionals in every region choose the reward that suits them." align="center" />
          <RewardRoutes />
        </div>
      </section>

      <section className="section s-paper" aria-labelledby="rfaq-h">
        <div className="wrap">
          <div data-reveal className="section-head">
            <h2 id="rfaq-h">Reward questions</h2>
            <p className="sh-lead">
              Compare methods in our guide to <Link to="/blog/upi-paypal-wire-amazon-survey-payouts/">UPI, PayPal, wire and gift card payouts</Link>.
            </p>
          </div>
          <ChatFaq items={faqs} />
        </div>
      </section>
      <CtaBand title="Your first reward starts with one survey." variant="treasury" />
    </div>
  );
}
