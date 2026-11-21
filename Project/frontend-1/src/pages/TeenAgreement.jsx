// /teen/agreement/: the Teen participation agreement (MINOR-2026.10) for teens and families,
// linked from step 3 of the Teen registration as the Teen privacy and participation notice.
// Part A in full (six chapters), and Part C: what joining means, in the teen's words.
import { Link } from '../router/Router.jsx';
import AgreementReader from '../components/teen/AgreementReader.jsx';
import { ASSENT, ASSENT_EMOJI, EN as AG } from '../data/teen/agreement.js';

export default function TeenAgreement() {
  return (
    <section className="agp">
      <div className="wrap agp-grid">
        <header className="agp-head">
          <p className="trg-chip">
            <span /> Teen panel · for teens and families
          </p>
          <h1>The Teen participation agreement</h1>
          <p>Plain words first. Tap any section for the full text. Your parent or guardian reads and agrees to the same agreement before your account switches on.</p>
        </header>
        <aside className="agp-assent">
          <h2>{AG.c_if}</h2>
          <ul>
            {ASSENT.map((x, i) => (
              <li key={x} style={{ '--i': i }}>
                <span aria-hidden="true">{ASSENT_EMOJI[i]}</span> {x}
              </li>
            ))}
          </ul>
          <p>{AG.c_decide}</p>
          <Link to="/join/teen/" className="trg-go">
            Back to my registration
          </Link>
        </aside>
        <div className="agp-reader">
          <AgreementReader audience="teen" />
        </div>
      </div>
    </section>
  );
}
