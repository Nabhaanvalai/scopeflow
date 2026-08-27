/** ScopeFlow Project Mela wizard: a multi-screen, INR-first client journey where every paid feature and route notification is explicit. */
import { ArrowLeft, ArrowRight, Bell, Check, CircleCheck, CloudUpload, CreditCard, FileText, KeyRound, Mail, Plus, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Screen = "path" | "brief" | "access" | "payments" | "launch" | "extras" | "summary";
type NoticeKind = "route" | "added" | "ready";
type RouteNotice = { id: number; kind: NoticeKind; title: string; description: string; unread: boolean };

const PROJECTS = [
  { id: "website", name: "Website", caption: "A strong digital front door.", price: 59000, included: ["Responsive website · up to 5 pages", "Contact or enquiry form", "Normal email/password login when an account is needed"] },
  { id: "webapp", name: "Web app", caption: "A useful tool people return to.", price: 89000, included: ["Responsive app interface", "Core user flow · up to 3 workflows", "Normal email/password login"] },
  { id: "ecommerce", name: "E-commerce", caption: "A shop with a calmer path to checkout.", price: 95000, included: ["Storefront · up to 20 products", "Product, cart, and checkout experience", "Normal email/password login"] },
  { id: "refresh", name: "Refresh", caption: "A more useful version of what exists.", price: 38000, included: ["Focused visual refresh", "Responsive polish for priority screens", "Source-code handover"] },
];

const ACCESS_OPTIONS = [
  { id: "no-login", name: "No account area", description: "Visitors use the experience without signing in.", price: 0, included: true },
  { id: "email-login", name: "Email & password", description: "A normal account flow for your users.", price: 0, included: true },
  { id: "google-login", name: "Google sign-in", description: "Let people create or access accounts with Google.", price: 12000, included: false },
  { id: "google-email", name: "Google + email login", description: "Offer both Google and normal account access.", price: 18000, included: false },
];

const PAYMENT_OPTIONS = [
  { id: "no-payments", name: "No payment flow", description: "Nothing is charged within this project.", price: 0, included: true },
  { id: "razorpay", name: "Razorpay payments", description: "One-time payments through Razorpay.", price: 18000, included: false },
  { id: "stripe", name: "Stripe payments", description: "One-time payments through Stripe.", price: 24000, included: false },
  { id: "subscriptions", name: "Subscriptions", description: "Recurring plans with a subscription checkout.", price: 32000, included: false },
];

const LAUNCH_OPTIONS = [
  { id: "handover", name: "Source-code handover", description: "Your project and instructions, ready for your team.", price: 0, included: true },
  { id: "managed-deploy", name: "Managed app deployment", description: "We deploy and connect the live application for you.", price: 12000, included: false },
  { id: "domain-deploy", name: "Deployment + custom domain", description: "Managed launch plus your chosen domain connection.", price: 16000, included: false },
  { id: "launch-care", name: "Launch care", description: "Deployment, domain, and 30 days of post-launch care.", price: 26000, included: false },
];

const EXTRAS = [
  { id: "copy", name: "Conversion copywriting", description: "Clear content and calls to action for core screens.", price: 18000 },
  { id: "cms", name: "Editing space", description: "A simple CMS so your team can update key content.", price: 16000 },
  { id: "analytics", name: "Analytics & events", description: "Track the useful moments that drive decisions.", price: 9000 },
  { id: "seo", name: "Technical SEO pass", description: "Metadata, indexability, performance and launch checks.", price: 14000 },
  { id: "training", name: "Team handover workshop", description: "A live working session with your team after launch.", price: 8000 },
  { id: "identity", name: "Starter identity", description: "A compact logo, colour and type foundation.", price: 24000 },
];

const formatINR = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [step, setStep] = useState(0);
  const [projectId, setProjectId] = useState("website");
  const [projectName, setProjectName] = useState("");
  const [outcome, setOutcome] = useState("");
  const [accessId, setAccessId] = useState("email-login");
  const [paymentId, setPaymentId] = useState("no-payments");
  const [launchId, setLaunchId] = useState("handover");
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<RouteNotice[]>([{ id: 1, kind: "route", title: "Route Dispatch is ready", description: "Every decision you make will show up here and in your final scope.", unread: true }]);

  const project = PROJECTS.find((item) => item.id === projectId) ?? PROJECTS[0];
  const access = ACCESS_OPTIONS.find((item) => item.id === accessId) ?? ACCESS_OPTIONS[1];
  const payment = PAYMENT_OPTIONS.find((item) => item.id === paymentId) ?? PAYMENT_OPTIONS[0];
  const launch = LAUNCH_OPTIONS.find((item) => item.id === launchId) ?? LAUNCH_OPTIONS[0];
  const hasPaymentsScreen = projectId === "ecommerce" || projectId === "webapp";
  const screens: Screen[] = ["path", "brief", "access", ...(hasPaymentsScreen ? ["payments" as Screen] : []), "launch", "extras", "summary"];
  const currentScreen = screens[step] ?? "summary";
  const selectedExtras = useMemo(() => EXTRAS.filter((item) => extraIds.includes(item.id)), [extraIds]);
  const additions = useMemo(() => [access, ...(hasPaymentsScreen ? [payment] : []), launch, ...selectedExtras].filter((item) => item.price > 0), [access, hasPaymentsScreen, launch, payment, selectedExtras]);
  const total = useMemo(() => project.price + additions.reduce((sum, item) => sum + item.price, 0), [additions, project.price]);
  const included = useMemo(() => [...project.included, ...(access.price === 0 ? [access.name] : []), ...(hasPaymentsScreen && payment.price === 0 ? [payment.name] : []), ...(launch.price === 0 ? [launch.name] : [])], [access, hasPaymentsScreen, launch, payment, project.included]);

  const addNotification = (title: string, description: string, kind: NoticeKind = "route") => setNotifications((current) => [{ id: Date.now(), kind, title, description, unread: true }, ...current].slice(0, 6));
  const move = (direction: 1 | -1) => {
    const nextStep = Math.max(0, Math.min(screens.length - 1, step + direction));
    setStep(nextStep);
    if (direction === 1 && nextStep !== step) addNotification("Next station unlocked", `${screens[nextStep] === "summary" ? "Your approval-ready scope" : `Continue to ${screens[nextStep]}`} is ready.`, "route");
  };
  const selectProject = (id: string) => { const item = PROJECTS.find((project) => project.id === id) ?? PROJECTS[0]; setProjectId(id); addNotification("Route changed", `${item.name} selected · foundation from ${formatINR(item.price)}.`, "route"); };
  const selectAccess = (id: string) => { const item = ACCESS_OPTIONS.find((option) => option.id === id) ?? ACCESS_OPTIONS[1]; setAccessId(id); addNotification(item.included ? "Included access selected" : "Authentication added", item.included ? `${item.name} stays within the foundation.` : `${item.name} adds ${formatINR(item.price)} to the scope.`, item.included ? "route" : "added"); };
  const selectPayment = (id: string) => { const item = PAYMENT_OPTIONS.find((option) => option.id === id) ?? PAYMENT_OPTIONS[0]; setPaymentId(id); addNotification(item.included ? "No payment integration selected" : "Payment integration added", item.included ? "No payment fee has been added to this route." : `${item.name} adds ${formatINR(item.price)} to the scope.`, item.included ? "route" : "added"); };
  const selectLaunch = (id: string) => { const item = LAUNCH_OPTIONS.find((option) => option.id === id) ?? LAUNCH_OPTIONS[0]; setLaunchId(id); addNotification(item.included ? "Handover selected" : "Launch support added", item.included ? "Source-code handover is part of your foundation." : `${item.name} adds ${formatINR(item.price)} to the scope.`, item.included ? "route" : "added"); };
  const pickExtra = (id: string) => { const item = EXTRAS.find((extra) => extra.id === id); const willAdd = !extraIds.includes(id); setExtraIds((items) => willAdd ? [...items, id] : items.filter((itemId) => itemId !== id)); if (item) addNotification(willAdd ? "Added to your route" : "Removed from your route", willAdd ? `${item.name} adds ${formatINR(item.price)} to the scope.` : `${item.name} is no longer included in the estimate.`, "added"); };
  const resetFlow = () => { setStep(0); setProjectId("website"); setProjectName(""); setOutcome(""); setAccessId("email-login"); setPaymentId("no-payments"); setLaunchId("handover"); setExtraIds([]); addNotification("Route reset", "Your choices are cleared and a fresh website route is ready.", "route"); toast.message("Fresh route, ready when you are."); };
  const sendScope = () => {
    const addOnText = additions.length ? additions.map((item) => `${item.name} (${formatINR(item.price)})`).join(", ") : "No paid additions selected";
    const subject = encodeURIComponent(`ScopeFlow scope request — ${projectName || project.name}`);
    const body = encodeURIComponent(`Hello,\n\nI would like an approval-ready scope for this project.\n\nProject: ${projectName || "To be named"}\nProject category: ${project.name}\nOutcome: ${outcome || "To be discussed"}\n\nBase build: ${formatINR(project.price)}\nIncluded: ${included.join(", ")}\nPaid additions: ${addOnText}\n\nCurrent scope total: ${formatINR(total)}\n\nPlease send the final proposal and next steps.`);
    addNotification("Formal scope ready", "Your itemised request is ready to open in your email app.", "ready");
    toast.success("Your itemised scope is ready to send.");
    window.setTimeout(() => { window.location.href = `mailto:hello@scopeflow.studio?subject=${subject}&body=${body}`; }, 400);
  };

  const stepTitle = currentScreen === "path" ? "Pick your path" : currentScreen === "brief" ? "Shape the brief" : currentScreen === "access" ? "Accounts & access" : currentScreen === "payments" ? "Payments" : currentScreen === "launch" ? "Launch path" : currentScreen === "extras" ? "Useful extras" : "Your scope";

  return (
    <div className="sfw-page">
      <div className="sfw-shell">
        <header className="sfw-header"><a className="sfw-brand" href="#top" aria-label="Start ScopeFlow again"><img src="/manus-storage/scopeflow-mela-mark_dd71e771.png" alt="" /><b>scopeflow</b><span>Clear scope for independent builders</span></a><div className="sfw-header-actions"><div className="sfw-header-meta"><i /> All prices in INR</div><NotificationTray notifications={notifications} open={notificationsOpen} onToggle={() => setNotificationsOpen((open) => !open)} onMarkRead={() => setNotifications((items) => items.map((item) => ({ ...item, unread: false })))} onDismiss={(id) => setNotifications((items) => items.filter((item) => item.id !== id))} /></div></header>
        <nav className="sfw-progress" aria-label="Onboarding progress"><div className="sfw-progress-track">{screens.map((screen, index) => <div style={{ display: "contents" }} key={screen}><div className={`sfw-progress-item ${index === step ? "is-active" : ""} ${index < step ? "is-done" : ""}`}><span>{index < step ? <Check size={11} strokeWidth={3} /> : String(index + 1).padStart(2, "0")}</span>{screen === "path" ? "Path" : screen === "brief" ? "Brief" : screen === "access" ? "Access" : screen === "payments" ? "Payments" : screen === "launch" ? "Launch" : screen === "extras" ? "Extras" : "Scope"}</div>{index < screens.length - 1 && <i className="sfw-progress-join" />}</div>)}</div></nav>

        <div className="sfw-layout" id="top">
          <aside className="sfw-aside"><div className="sfw-aside-inner"><p className="sfw-kicker">A project needs a route</p><h1>Every <em>yes</em> needs a place.</h1><p>Choose the foundation. Add only what matters. Keep the price beside the decision all the way to approval.</p><div className="sfw-aside-visual"><img src="/manus-storage/scopeflow-mela-options_b48090fb.jpg" alt="Abstract colorful tokens arranged as modular project choices" /><span><Sparkles size={11} /> Build it together</span></div></div></aside>

          <main className="sfw-main">
            <section className="sfw-card sfw-animate" aria-labelledby="screen-title">
              <div className="sfw-card-head"><p><span className="sfw-station-badge">{String(step + 1).padStart(2, "0")}</span> Station · {stepTitle}</p><span className="sfw-step-number">{String(step + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</span></div>
              <div className="sfw-card-body">
                {currentScreen === "path" && <div>
                  <p className="sfw-kicker">First, the shape</p><h2 id="screen-title">What are we <span className="sfw-emphasis">building?</span></h2><p className="sfw-screen-intro">Pick the closest starting point. The route adapts next, so an e-commerce or web-app project gets its own payment decisions.</p>
                  <div className="sfw-project-grid">{PROJECTS.map((item, index) => <button className={`sfw-project ${projectId === item.id ? "is-selected" : ""}`} type="button" key={item.id} onClick={() => selectProject(item.id)} aria-pressed={projectId === item.id}><span className="sfw-project-top"><span>{projectId === item.id ? <Check size={13} strokeWidth={3} /> : `0${index + 1}`}</span></span><strong>{item.name}</strong><small>{item.caption}</small><span className="sfw-project-price">from {formatINR(item.price)}</span></button>)}</div>
                </div>}

                {currentScreen === "brief" && <div><p className="sfw-kicker">Give it a name</p><h2 id="screen-title">What needs to be <span className="sfw-emphasis">true</span> at launch?</h2><p className="sfw-screen-intro">A useful first version is enough. You can make the brief more precise together before the work is approved.</p><div className="sfw-fields"><div className="sfw-field"><label htmlFor="projectName">Project name</label><input id="projectName" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="For example, Poppy Studio" /></div><div className="sfw-field sfw-field--wide"><label htmlFor="outcome">The outcome you want</label><textarea id="outcome" value={outcome} onChange={(event) => setOutcome(event.target.value)} placeholder="For example, make it simple for people to understand our offer, see pricing, and become a customer." /></div></div><div className="sfw-feature-note"><FileText size={18} /><p><b>Your words will appear in the final scope summary.</b> The goal is a shared direction, not a long requirements document.</p></div></div>}

                {currentScreen === "access" && <ChoiceScreen title={<>How will people <span className="sfw-emphasis">get in?</span></>} kicker="Accounts & access" intro="Normal email and password access is included. If you want Google sign-in, it is a separate integration with a clear fixed fee." options={ACCESS_OPTIONS} value={accessId} onChange={selectAccess} icon={<KeyRound size={18} />} note={<><b>Included means included.</b> We only add an INR fee when authentication needs a third-party provider or a more complex setup.</>} />}

                {currentScreen === "payments" && <ChoiceScreen title={<>Will money move through <span className="sfw-emphasis">this experience?</span></>} kicker="Payment decisions" intro={projectId === "ecommerce" ? "Choose the payment route for your shop. The basic storefront is included; connecting a real payment provider is priced separately." : "Choose a payment route only if customers pay inside this web app. Each live payment option is a separately scoped integration."} options={PAYMENT_OPTIONS} value={paymentId} onChange={selectPayment} icon={<CreditCard size={18} />} note={<><b>Payment setup is a paid integration.</b> Provider transaction fees, account setup and compliance remain between you and your payment provider.</>} />}

                {currentScreen === "launch" && <ChoiceScreen title={<>How should it reach the <span className="sfw-emphasis">world?</span></>} kicker="Launch path" intro="A complete source-code handover is included. Choose managed deployment if you want us to make it live, connect the domain, or stay close after launch." options={LAUNCH_OPTIONS} value={launchId} onChange={selectLaunch} icon={<CloudUpload size={18} />} note={<><b>In-app managed deployment is a paid addition.</b> This gives you a clear choice between handover and a supported live launch.</>} />}

                {currentScreen === "extras" && <div><p className="sfw-kicker">The useful finishing work</p><h2 id="screen-title">Anything else worth putting <span className="sfw-emphasis">on the route?</span></h2><p className="sfw-screen-intro">These are common requests that change the work. They are optional, individually priced, and stay visible in your final scope.</p><div className="sfw-option-grid">{EXTRAS.map((item) => { const selected = extraIds.includes(item.id); return <button className={`sfw-option ${selected ? "is-selected" : ""}`} type="button" key={item.id} onClick={() => pickExtra(item.id)} aria-pressed={selected}><span className="sfw-option-mark">{selected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={2.7} />}</span><span><span className="sfw-option-title">{item.name}</span><span className="sfw-option-copy">{item.description}</span></span><span className="sfw-option-cost">+{formatINR(item.price)}</span></button>; })}</div></div>}

                {currentScreen === "summary" && <div><p className="sfw-kicker">Your approval-ready route</p><h2 id="screen-title">This is the <span className="sfw-emphasis">work.</span></h2><p className="sfw-screen-intro">Here is the line between the foundation, what is included, and the extra work you have chosen. Take this to a proposal or send it directly as a scope request.</p><div className="sfw-summary"><div className="sfw-summary-card"><h3>Included in your {project.name.toLowerCase()} foundation</h3><div className="sfw-summary-list">{included.map((item) => <div className="sfw-summary-row" key={item}><span>{item}</span><b>Included</b></div>)}</div></div><div className="sfw-total-card"><p>Current INR estimate</p><h3>{projectName || `${project.name} project`}</h3><strong className="sfw-total-price">{formatINR(total)}</strong><small>Excludes applicable taxes, domain renewals, payment-provider charges, and any new work requested after this scope is approved.</small></div></div><div className="sfw-summary-card" style={{ marginTop: 17 }}><h3>Paid additions selected</h3><div className="sfw-summary-list">{additions.length ? additions.map((item) => <div className="sfw-summary-row" key={item.id}><span>{item.name}</span><b className="is-extra">+{formatINR(item.price)}</b></div>) : <p className="sfw-summary-empty">No paid additions selected. Your estimate currently includes only the project foundation.</p>}</div></div></div>}
              </div>

              {currentScreen !== "summary" && <div className="sfw-total-ticket"><span className="sfw-ticket-route">Fare<br />on route</span><span className="sfw-ticket-label">Current INR scope</span><b>{formatINR(total)}</b></div>}
              <div className="sfw-card-footer">
                {step > 0 ? <button type="button" className="sfw-button sfw-button--ghost" onClick={() => move(-1)}><ArrowLeft size={14} /> Previous stop</button> : <button type="button" className="sfw-button sfw-button--ghost" onClick={resetFlow}>Start over</button>}
                {currentScreen === "summary" ? <button type="button" className="sfw-button sfw-button--primary" onClick={sendScope}>Request formal scope <Mail size={14} /></button> : <button type="button" className="sfw-button sfw-button--primary" onClick={() => move(1)}>Next stop <ArrowRight size={14} /></button>}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function ChoiceScreen({ title, kicker, intro, options, value, onChange, icon, note }: { title: React.ReactNode; kicker: string; intro: string; options: { id: string; name: string; description: string; price: number; included: boolean }[]; value: string; onChange: (value: string) => void; icon: React.ReactNode; note: React.ReactNode; }) {
  return <div><p className="sfw-kicker">{kicker}</p><h2 id="screen-title">{title}</h2><p className="sfw-screen-intro">{intro}</p><div className="sfw-option-grid">{options.map((item, index) => <button className={`sfw-option ${value === item.id ? "is-selected" : ""}`} type="button" key={item.id} onClick={() => onChange(item.id)} aria-pressed={value === item.id}><span className="sfw-option-mark">{value === item.id ? <Check size={14} strokeWidth={3} /> : `0${index + 1}`}</span><span><span className="sfw-option-title">{item.name}</span><span className="sfw-option-copy">{item.description}</span></span><span className={`sfw-option-cost ${item.included ? "is-included" : ""}`}>{item.included ? "Included" : `+${formatINR(item.price)}`}</span></button>)}</div><div className="sfw-feature-note">{icon}<p>{note}</p></div></div>;
}

function NotificationTray({ notifications, open, onToggle, onMarkRead, onDismiss }: { notifications: RouteNotice[]; open: boolean; onToggle: () => void; onMarkRead: () => void; onDismiss: (id: number) => void; }) {
  const unread = notifications.filter((notice) => notice.unread).length;
  return <div className="sfw-notice-wrap"><button type="button" className="sfw-notice-trigger" onClick={onToggle} aria-label={`Open Route Dispatch notifications${unread ? `, ${unread} unread` : ""}`} aria-expanded={open}><Bell size={17} strokeWidth={2.4} />{unread > 0 && <span className="sfw-notice-count">{unread > 9 ? "9+" : unread}</span>}</button>{open && <section className="sfw-notice-tray" aria-label="Route Dispatch notifications"><div className="sfw-notice-head"><div><strong>Route Dispatch</strong><small>Decisions, delivered clearly</small></div><button type="button" className="sfw-notice-read" onClick={onMarkRead}>Mark all read</button></div><div className="sfw-notice-list">{notifications.length ? notifications.map((notice, index) => <article className={`sfw-notice ${notice.unread ? "is-unread" : ""}`} data-kind={notice.kind} key={notice.id}><span className="sfw-notice-route">{String(index + 1).padStart(2, "0")}</span><div className="sfw-notice-copy"><strong>{notice.title}</strong><p>{notice.description}</p></div><button type="button" className="sfw-notice-dismiss" onClick={() => onDismiss(notice.id)} aria-label={`Dismiss ${notice.title}`}><X size={13} /></button></article>) : <p className="sfw-summary-empty" style={{ margin: "0 14px" }}>No route updates waiting for you.</p>}</div></section>}</div>;
}
