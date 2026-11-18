// Signature visual: the 3-step pipeline. (The topics fan was replaced by SurveyMachine.jsx in October 2026.)
import Icon from '../Icon.jsx';

const STEPS = [
  { t: 'Sign up free', d: 'Register with an active email and phone number, then verify both with a link and an OTP.', icon: 'user', color: '#49B6FF' },
  { t: 'Share your opinion', d: 'Complete your profile, get matched invitations and answer honestly – on mobile or desktop.', icon: 'chat', color: '#7B5CFF' },
  { t: 'Get rewarded', d: 'Reach your threshold and redeem through PayPal, cash rewards, bank or wire transfer, vouchers or digital gift cards – plus UPI in India.', icon: 'gift', color: '#FFB020' }
];

export function StepsPipeline() {
  return (
    <div className="pipeline">
      <svg className="pipeline-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="pl" x1="0" x2="1">
            <stop offset="0" stopColor="#49B6FF" />
            <stop offset=".5" stopColor="#7B5CFF" />
            <stop offset="1" stopColor="#FFB020" />
          </linearGradient>
        </defs>
        <path d="M20 60 C 200 -10, 300 130, 500 60 S 800 -10, 980 60" fill="none" stroke="url(#pl)" strokeWidth="4" strokeLinecap="round" className="pl-base" />
        <path d="M20 60 C 200 -10, 300 130, 500 60 S 800 -10, 980 60" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" className="pl-pulse" />
      </svg>
      <ol className="pipeline-steps">
        {STEPS.map((s, i) => (
          <li key={s.t} style={{ '--c': s.color, '--i': i }} data-reveal>
            <span className="pipe-node">
              <Icon name={s.icon} size={28} />
              <span className="pipe-n">{i + 1}</span>
            </span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
