/** ScopeFlow Project Ledger page: editorial scope control with an asymmetric rail and vermilion decision states. */
import { ArrowRight, Check, ChevronDown, FileText, Mail, Plus, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const BASE_PRICE = 3200;

const projectTypes = [
  { id: "Website", detail: "A focused marketing site" },
  { id: "Web app", detail: "A workflow or product tool" },
  { id: "E-commerce", detail: "A shoppable storefront" },
  { id: "Something else", detail: "We will define it together" },
];

const addOns = [
  { id: "copy", name: "Conversion copywriting", description: "Messaging, page copy, and calls to action.", price: 750 },
  { id: "brand", name: "Light brand system", description: "Logo direction, color system, and type pairing.", price: 950 },
  { id: "cms", name: "CMS editing space", description: "A simple content workflow for your team.", price: 650 },
  { id: "analytics", name: "Analytics & events", description: "Key events, dashboard setup, and handover.", price: 450 },
  { id: "seo", name: "Technical SEO pass", description: "Indexing, metadata, speed, and launch checks.", price: 600 },
];

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [projectType, setProjectType] = useState("Website");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("$3k–$6k");

  const selectedItems = useMemo(() => addOns.filter((item) => selectedAddOns.includes(item.id)), [selectedAddOns]);
  const total = useMemo(() => BASE_PRICE + selectedItems.reduce((sum, item) => sum + item.price, 0), [selectedItems]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const scrollToScope = () => document.getElementById("scope")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const requestSummary = () => {
    const addOnText = selectedItems.length ? selectedItems.map((item) => `${item.name} (${money(item.price)})`).join(", ") : "None selected";
    const subject = encodeURIComponent(`ScopeFlow request — ${projectName || projectType}`);
    const body = encodeURIComponent(`Hello,\n\nI would like to request a formal scope summary.\n\nProject: ${projectName || "Not named yet"}\nType: ${projectType}\nPrimary outcome: ${goal || "To be discussed"}\nWorking budget: ${budget}\n\nCore build: ${money(BASE_PRICE)}\nSelected additions: ${addOnText}\nCurrent total: ${money(total)}\n\nPlease send the next steps.`);
    toast.success("Your scope request is ready to send.");
    window.setTimeout(() => { window.location.href = `mailto:hello@scopeflow.studio?subject=${subject}&body=${body}`; }, 450);
  };

  return (
    <div className="sf-page">
      <div className="sf-shell">
        <aside className="sf-rail" aria-label="ScopeFlow project stages">
          <div>
            <div className="sf-rail-top">
              <a className="sf-wordmark" href="#top" aria-label="ScopeFlow home"><img src="/manus-storage/scopeflow-mark_850850a8.png" alt="" /><span>SCOPE<b>•</b>FLOW</span></a>
              <span className="sf-meta">v1.0</span>
            </div>
            <p className="sf-rail-kicker">Your project ledger</p>
            <p className="sf-rail-title">The conversation, made concrete.</p>
            <div className="sf-rail-line" />
            <ol className="sf-stages">
              <li className="is-current"><span className="sf-stage-num">01</span><span className="sf-stage-name">Project starter</span></li>
              <li><span className="sf-stage-num">02</span><span className="sf-stage-name">Scope & add-ons</span></li>
              <li><span className="sf-stage-num">03</span><span className="sf-stage-name">Approval</span></li>
              <li><span className="sf-stage-num">04</span><span className="sf-stage-name">Build & launch</span></li>
            </ol>
          </div>
          <div className="sf-rail-bottom"><span className="sf-label">A better brief</span><p>No surprise work. No invisible decisions. Just a shared plan with a price beside every change.</p></div>
        </aside>

        <main className="sf-main" id="top">
          <div className="sf-mobilebar"><a className="sf-wordmark" href="#top"><img src="/manus-storage/scopeflow-mark_850850a8.png" alt="" /><span>SCOPE<b>•</b>FLOW</span></a><button className="sf-btn sf-btn--small sf-btn--primary" onClick={scrollToScope}>Start a brief <ArrowRight size={13} /></button></div>

          <section className="sf-hero">
            <nav className="sf-topnav" aria-label="Primary navigation"><a href="#scope">Build your scope</a><a href="#process">How it works</a><a href="#contact">Contact</a></nav>
            <div className="sf-hero-grid">
              <div className="sf-hero-copy sf-reveal">
                <span className="sf-kicker">Freelance project onboarding</span>
                <h1>Turn a moving target into a <em>signed</em> plan.</h1>
                <p>ScopeFlow gives your project a single source of truth before the build starts. Choose what matters, see the cost of every addition, then approve a brief you can both stand behind.</p>
                <div className="sf-hero-actions"><button className="sf-btn sf-btn--primary" onClick={scrollToScope}>Build your scope <ArrowRight size={15} /></button><a className="sf-btn" href="#process">See the process <ChevronDown size={15} /></a></div>
              </div>
              <div className="sf-hero-art sf-reveal sf-reveal--delay">
                <img src="/manus-storage/scopeflow-hero-ledger_948c6163.jpg" alt="A project ledger, papers, pencil, and red project tools on an ivory desk" />
                <span className="sf-art-stamp">Scope, not guesswork</span>
                <div className="sf-art-caption"><strong>01</strong><span>Start with what is true now</span></div>
              </div>
            </div>
            <span className="sf-index">SCF / 2026</span>
          </section>

          <section className="sf-intro-band" aria-label="ScopeFlow promise">
            <div className="sf-intro-card sf-intro-card--ink"><span className="sf-kicker">A shared record</span><h2>Every “could we also…” gets a clear answer.</h2><p>Moving from conversation to a documented request protects the project, the relationship, and your launch date.</p></div>
            <div className="sf-intro-card sf-intro-card--paper"><div className="sf-stat"><strong>1</strong><span>clear scope shared by everyone</span></div><div className="sf-stat"><strong>$0</strong><span>of unpriced work quietly folded in</span></div></div>
          </section>

          <section className="sf-workspace" id="scope">
            <div className="sf-section-head"><div><span className="sf-kicker">Project starter</span><h2>Let’s name what we’re making.</h2></div><p>Start with the practical shape of the project. You can refine the brief together later; this keeps the decision trail visible from day one.</p></div>

            <div className="sf-ledger">
              <form className="sf-form-card" onSubmit={(event) => { event.preventDefault(); toast.success("Project starter saved in this session."); }}>
                <div className="sf-form-top"><div><span className="sf-label">The foundation</span><h3>What needs to be true at launch?</h3></div><span className="sf-form-number">01</span></div>
                <div className="sf-form-body">
                  <div className="sf-fields">
                    <div className="sf-field"><label htmlFor="project-name">Project name</label><input id="project-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="e.g. Northstar Studio" /></div>
                    <div className="sf-field"><label htmlFor="budget">Working budget</label><select id="budget" value={budget} onChange={(event) => setBudget(event.target.value)}><option>$3k–$6k</option><option>$6k–$10k</option><option>$10k–$18k</option><option>Let’s discuss</option></select></div>
                    <div className="sf-field sf-field--full"><label htmlFor="goal">The primary outcome</label><textarea id="goal" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="What should this website or app make easier, clearer, or possible?" /></div>
                  </div>
                  <p className="sf-choice-label">Choose the closest starting point</p>
                  <div className="sf-type-grid">{projectTypes.map((item) => <button type="button" key={item.id} onClick={() => setProjectType(item.id)} className={`sf-type ${projectType === item.id ? "is-active" : ""}`} aria-pressed={projectType === item.id}>{item.id}<span>{item.detail}</span></button>)}</div>
                </div>
              </form>

              <div className="sf-addon-zone">
                <div className="sf-addon-heading"><div><span className="sf-kicker">Fixed-price additions</span><h3>Make changes visible.</h3></div><p>Select only what supports<br />the work in front of us.</p></div>
                <div className="sf-addon-list">{addOns.map((item) => { const isSelected = selectedAddOns.includes(item.id); return <button type="button" key={item.id} onClick={() => toggleAddOn(item.id)} className={`sf-addon ${isSelected ? "is-selected" : ""}`} aria-pressed={isSelected}><span className="sf-addon-check">{isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={2} />}</span><span><span className="sf-addon-name">{item.name}</span><span className="sf-addon-desc">{item.description}</span></span><span className="sf-addon-price">+{money(item.price)}</span></button>; })}</div>
                <aside className="sf-summary" aria-live="polite"><span className="sf-label">Your live scope</span><h3 className="sf-summary-title">A price beside every yes.</h3><div className="sf-summary-rows"><div className="sf-summary-row"><span>Core {projectType.toLowerCase()} build</span><span>{money(BASE_PRICE)}</span></div>{selectedItems.map((item) => <div className="sf-summary-row" key={item.id}><span>{item.name}</span><span>{money(item.price)}</span></div>)}{selectedItems.length === 0 && <div className="sf-summary-row"><span>No additions selected yet</span><span>—</span></div>}</div><div className="sf-summary-total"><div><span className="sf-price-label">Current total</span><strong>{money(total)}</strong></div><small>Before tax<br />and hosting</small></div><button type="button" className="sf-btn" onClick={requestSummary}>Request formal scope <Mail size={14} /></button><p className="sf-summary-note">Your summary opens in your email client. Nothing is committed until both sides approve the final brief.</p></aside>
              </div>
            </div>
          </section>

          <section className="sf-process" id="process">
            <div className="sf-process-copy"><span className="sf-kicker">The handover path</span><h2>Good work needs a record of what was decided.</h2><p>The build is not a black box. Each milestone creates a clearer agreement and a reliable place to come back to when the conversation evolves.</p></div>
            <div className="sf-process-image"><img src="/manus-storage/scopeflow-brief-detail_9e0d1b2c.jpg" alt="A carefully arranged project brief with a red stamp and paper materials" /></div>
            <div className="sf-process-steps"><article className="sf-process-step"><span className="sf-stage-num">01</span><h3>Start the brief</h3><p>State the outcome, format, and working context.</p></article><article className="sf-process-step"><span className="sf-stage-num">02</span><h3>Choose additions</h3><p>Put a decision and a fixed price beside each extra.</p></article><article className="sf-process-step"><span className="sf-stage-num">03</span><h3>Approve the scope</h3><p>Review the shared summary before work begins.</p></article><article className="sf-process-step"><span className="sf-stage-num">04</span><h3>Build with confidence</h3><p>Move through design, build, launch, and handover.</p></article></div>
          </section>

          <section className="sf-closing" id="contact"><div><span className="sf-kicker">No ambiguity required</span><h2>Start the work you actually want built.</h2></div><button className="sf-btn" onClick={scrollToScope}>Build your scope <ArrowRight size={15} /></button></section>
          <footer className="sf-footer"><a className="sf-wordmark" href="#top"><img src="/manus-storage/scopeflow-mark_850850a8.png" alt="" /><span>SCOPE<b>•</b>FLOW</span></a><p><ShieldCheck size={12} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />Clear scope. Fair additions. Calm delivery.</p><p>© 2026 Independent builders</p></footer>
        </main>
      </div>
    </div>
  );
}

