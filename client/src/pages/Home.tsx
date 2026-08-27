/** ScopeFlow Project Mela: client onboarding is a visible, colorful route with INR decisions in plain view. */
import { ArrowRight, Check, CircleDollarSign, Mail, MoveRight, Plus, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const BASE_PRICE = 79000;

const projectTypes = [
  { id: "Website", detail: "A marketing site that gets to the point." },
  { id: "Web app", detail: "A product or workflow worth using daily." },
  { id: "E-commerce", detail: "A shop with a sharper customer path." },
  { id: "Refresh", detail: "A useful reset for what you already have." },
];

const addOns = [
  { id: "copy", name: "Conversion copywriting", description: "Words that make the next step obvious.", price: 18000 },
  { id: "brand", name: "Starter identity", description: "A considered visual base for your next chapter.", price: 24000 },
  { id: "cms", name: "Editing space", description: "A clear way for your team to update content.", price: 16000 },
  { id: "analytics", name: "Analytics & events", description: "Know which moments are doing the work.", price: 9000 },
  { id: "seo", name: "Technical SEO pass", description: "A launch-ready check for search and speed.", price: 14000 },
];

const formatINR = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [projectType, setProjectType] = useState("Website");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("₹75,000 – ₹1,25,000");

  const selectedItems = useMemo(() => addOns.filter((item) => selectedAddOns.includes(item.id)), [selectedAddOns]);
  const total = useMemo(() => BASE_PRICE + selectedItems.reduce((sum, item) => sum + item.price, 0), [selectedItems]);

  const startRoute = () => document.getElementById("your-route")?.scrollIntoView({ behavior: "smooth", block: "start" });
  const toggleAddOn = (id: string) => setSelectedAddOns((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  const sendScopeRequest = () => {
    const extras = selectedItems.length ? selectedItems.map((item) => `${item.name} (${formatINR(item.price)})`).join(", ") : "None selected";
    const subject = encodeURIComponent(`ScopeFlow route — ${projectName || projectType}`);
    const body = encodeURIComponent(`Hello,\n\nI am ready to request a formal ScopeFlow project route.\n\nProject: ${projectName || "Not named yet"}\nProject type: ${projectType}\nThe outcome I need: ${goal || "To be discussed"}\nWorking budget: ${budget}\n\nCore build: ${formatINR(BASE_PRICE)}\nSelected additions: ${extras}\nCurrent route total: ${formatINR(total)}\n\nPlease send the approval-ready scope.`);
    toast.success("Your route summary is ready to send.");
    window.setTimeout(() => { window.location.href = `mailto:hello@scopeflow.studio?subject=${subject}&body=${body}`; }, 420);
  };

  return (
    <div className="mf-page">
      <div className="mf-wrap">
        <header className="mf-topbar">
          <a className="mf-brand" href="#top" aria-label="ScopeFlow home"><img src="/manus-storage/scopeflow-mela-mark_dd71e771.png" alt="" /><span className="mf-brand-name">scopeflow</span><span className="mf-brand-note">The shared project route</span></a>
          <div className="mf-top-status"><span className="mf-status-dot" /> All prices in INR</div>
        </header>

        <main id="top">
          <section className="mf-hero">
            <div className="mf-hero-copy mf-animate">
              <p className="mf-eyebrow">For projects with a moving brief</p>
              <h1>Make room for change. <span className="mf-h1-pop">Not surprises.</span></h1>
              <p className="mf-hero-text">A better way to start web projects: name the work, place every extra on the route, and get an INR total your whole team can see.</p>
              <div className="mf-hero-actions"><button className="mf-button mf-button--ink" onClick={startRoute}>Start your route <ArrowRight size={15} /></button><a className="mf-button" href="#how-it-works">How it works <MoveRight size={15} /></a></div>
              <div className="mf-hero-tags"><span>Clear scope</span><span>Fixed additions</span><span>Human conversation</span></div>
            </div>
            <div className="mf-hero-visual mf-animate mf-animate--two"><img src="/manus-storage/scopeflow-mela-hero_da5b4568.jpg" alt="An abstract bright paper route made from cobalt, marigold, red and lime shapes" /><span className="mf-route-label">The route starts here</span><div className="mf-route-badge"><span>scope = shared</span></div></div>
          </section>

          <div className="mf-route-strip" aria-label="Your onboarding route"><strong>01</strong><span className="mf-route-current">Tell us the shape</span><i /><strong>02</strong><span>Choose the extras</span><i /><strong>03</strong><span>Get the scope</span><i /><strong>04</strong><span>Build with direction</span></div>

          <section className="mf-brief" id="your-route">
            <div className="mf-route-line" aria-hidden="true" />
            <div className="mf-section-header"><div><p className="mf-eyebrow">Station one</p><h2>Start with the work that earns its place.</h2></div><p>We do not need a perfect document to begin. We do need a useful first version of the truth—what you need, why it matters, and the space it should live in.</p></div>

            <form className="mf-station" onSubmit={(event) => { event.preventDefault(); toast.success("Your starting point is saved for this session."); }}>
              <div className="mf-station-head"><p>Tell the story, plainly</p><span className="mf-station-number">01</span></div>
              <div className="mf-station-body">
                <h3>What will be different when this project is live?</h3>
                <div className="mf-fields">
                  <div className="mf-field"><label htmlFor="project-name">Project name</label><input id="project-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="For example, Aster & Co." /></div>
                  <div className="mf-field"><label htmlFor="budget">Working budget</label><select id="budget" value={budget} onChange={(event) => setBudget(event.target.value)}><option>₹75,000 – ₹1,25,000</option><option>₹1,25,000 – ₹2,00,000</option><option>₹2,00,000 – ₹4,00,000</option><option>Let’s define it together</option></select></div>
                  <div className="mf-field mf-field--wide"><label htmlFor="goal">The outcome you are after</label><textarea id="goal" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="For example, help qualified visitors understand our offer and make it easy to enquire." /></div>
                </div>
                <p className="mf-small-label" style={{ marginTop: 26, marginBottom: 10 }}>Choose the closest route</p>
                <div className="mf-project-choices">{projectTypes.map((type, index) => <button key={type.id} type="button" className={`mf-project-choice ${projectType === type.id ? "is-selected" : ""}`} onClick={() => setProjectType(type.id)} aria-pressed={projectType === type.id}><span className="mf-choice-mark"><span>{projectType === type.id ? <Check size={12} strokeWidth={3} /> : `0${index + 1}`}</span></span><strong>{type.id}</strong><small>{type.detail}</small></button>)}</div>
              </div>
            </form>
          </section>

          <section className="mf-scope-zone">
            <div className="mf-scope-grid">
              <div className="mf-addon-section">
                <div className="mf-addon-title"><div><p className="mf-eyebrow">Station two</p><h2>Put it on the route. See the price.</h2></div><p>These are real decisions, not slippery “small tweaks.” Choose an addition only when it supports the outcome above.</p></div>
                <div className="mf-addon-list">{addOns.map((addOn) => { const selected = selectedAddOns.includes(addOn.id); return <button key={addOn.id} type="button" className={`mf-addon ${selected ? "is-selected" : ""}`} onClick={() => toggleAddOn(addOn.id)} aria-pressed={selected}><span className="mf-addon-toggle">{selected ? <Check size={14} strokeWidth={3} /> : <Plus size={15} strokeWidth={2.4} />}</span><span><span className="mf-addon-name">{addOn.name}</span><span className="mf-addon-desc">{addOn.description}</span></span><span className="mf-addon-price">+{formatINR(addOn.price)}</span></button>; })}</div>
              </div>

              <aside className="mf-ticket-wrap" aria-live="polite">
                <div className="mf-ticket">
                  <div className="mf-ticket-top"><div><p className="mf-small-label" style={{ color: "#f8bd39" }}>Your route ticket</p><h3>One clear total, at every turn.</h3></div><span className="mf-route-icon"><CircleDollarSign size={21} strokeWidth={2.4} /></span></div>
                  <div className="mf-ticket-items"><div className="mf-ticket-row"><span>Core {projectType.toLowerCase()} build</span><strong>{formatINR(BASE_PRICE)}</strong></div>{selectedItems.map((item) => <div className="mf-ticket-row" key={item.id}><span>{item.name}</span><strong>{formatINR(item.price)}</strong></div>)}{!selectedItems.length && <div className="mf-ticket-row mf-ticket-row--muted"><span>Your selected extras appear here.</span><strong>—</strong></div>}</div>
                  <div className="mf-ticket-total"><div><span>Current route total</span><strong>{formatINR(total)}</strong></div><small>Excludes applicable taxes, domain, and third-party tools.</small></div>
                  <button type="button" className="mf-button" onClick={sendScopeRequest}>Draft formal scope <Mail size={15} /></button>
                  <p className="mf-ticket-note">This opens a ready-to-send email summary. The work only locks when both sides approve the final scope.</p>
                </div>
                <div className="mf-ticket-stub">ScopeFlow · each change gets a place</div>
              </aside>
            </div>
          </section>

          <section className="mf-decision" id="how-it-works">
            <div className="mf-decision-visual"><img src="/manus-storage/scopeflow-mela-route_ebfd8037.jpg" alt="A sculptural paper route passing colorful checkpoints" /></div>
            <div className="mf-decision-copy"><p className="mf-eyebrow">A useful agreement</p><h2>Less “just one more thing.” More forward.</h2><p>ScopeFlow makes the commercial side of a good working relationship visible without making the conversation cold. We keep an honest route, then build against it.</p><div className="mf-decision-steps"><article className="mf-decision-step"><span>01</span><h3>Start together</h3><p>Name the aim and format.</p></article><article className="mf-decision-step"><span>02</span><h3>Price additions</h3><p>Make every extra explicit.</p></article><article className="mf-decision-step"><span>03</span><h3>Approve the route</h3><p>Review one shared plan.</p></article><article className="mf-decision-step"><span>04</span><h3>Build calmly</h3><p>Keep decisions easy to find.</p></article></div></div>
          </section>

          <section className="mf-final"><div><p className="mf-eyebrow" style={{ color: "#fff7e9" }}>Station three</p><h2>The right build starts with a <em>visible yes.</em></h2></div><div><p>Open the route, choose what belongs in it, and turn today’s conversation into a practical beginning.</p><button className="mf-button mf-button--paper" style={{ marginTop: 23 }} onClick={startRoute}>Start your route <Sparkles size={15} /></button></div></section>
        </main>

        <footer className="mf-footer"><a className="mf-brand" href="#top"><img src="/manus-storage/scopeflow-mela-mark_dd71e771.png" alt="" /><span className="mf-brand-name">scopeflow</span></a><small>Clear scope. Fair additions. Projects that move.</small><small>Made for independent builders in India.</small></footer>
      </div>
    </div>
  );
}
