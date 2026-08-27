/** ScopeFlow AI Scope Studio: the onboarding route turns a real project idea into server-generated, selectable INR recommendations. */
import { ArrowLeft, ArrowRight, Bell, Check, Cloud, FileText, Lightbulb, Mail, Plus, Sparkles, WandSparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type Screen = "path" | "brief" | "ai" | "summary";
type NoticeKind = "route" | "added" | "ready";
type RouteNotice = { id: number; kind: NoticeKind; title: string; description: string; unread: boolean };
type AIRecommendation = { id: string; kind: string; name: string; description: string; reason: string; price: number; recommended: boolean };
type AIResult = { projectSummary: string; included: { name: string; description: string }[]; recommendations: AIRecommendation[] };

const PROJECTS = [
  { id: "website", name: "Website", caption: "A strong digital front door.", price: 59000 },
  { id: "webapp", name: "Web app", caption: "A useful tool people return to.", price: 89000 },
  { id: "ecommerce", name: "E-commerce", caption: "A shop with a calmer path to checkout.", price: 95000 },
  { id: "custom", name: "Custom build", caption: "Bring a real-world idea to the route.", price: 79000 },
];

const formatINR = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [step, setStep] = useState(0);
  const [projectId, setProjectId] = useState("website");
  const [projectName, setProjectName] = useState("");
  const [customIdea, setCustomIdea] = useState("");
  const [outcome, setOutcome] = useState("");
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [selectedRecommendationIds, setSelectedRecommendationIds] = useState<string[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<RouteNotice[]>([{ id: 1, kind: "route", title: "Route Dispatch is ready", description: "Your AI suggestions and scope changes will show up here.", unread: true }]);

  const project = PROJECTS.find((item) => item.id === projectId) ?? PROJECTS[0];
  const screens: Screen[] = ["path", "brief", "ai", "summary"];
  const currentScreen = screens[step] ?? "summary";
  const selectedRecommendations = useMemo(() => aiResult?.recommendations.filter((item) => selectedRecommendationIds.includes(item.id)) ?? [], [aiResult, selectedRecommendationIds]);
  const total = useMemo(() => project.price + selectedRecommendations.reduce((sum, item) => sum + item.price, 0), [project.price, selectedRecommendations]);

  const addNotification = (title: string, description: string, kind: NoticeKind = "route") => setNotifications((current) => [{ id: Date.now(), kind, title, description, unread: true }, ...current].slice(0, 6));
  const recommendationMutation = trpc.scope.recommend.useMutation({
    onSuccess: (data) => {
      setAiResult(data as AIResult);
      setSelectedRecommendationIds([]);
      addNotification("AI scope suggestions are ready", `${data.recommendations.length} tailored additions are ready for you to choose.`, "ready");
    },
    onError: () => {
      addNotification("Suggestions could not load", "Please check the project detail and try the AI Scope Studio again.", "route");
      toast.error("We could not generate suggestions just now. Please try again.");
    },
  });

  const selectProject = (id: string) => {
    const item = PROJECTS.find((projectOption) => projectOption.id === id) ?? PROJECTS[0];
    setProjectId(id);
    setAiResult(null);
    setSelectedRecommendationIds([]);
    addNotification("Route changed", `${item.name} selected · starting from ${formatINR(item.price)} before AI-selected additions.`, "route");
  };

  const move = (direction: 1 | -1) => {
    const nextStep = Math.max(0, Math.min(screens.length - 1, step + direction));
    setStep(nextStep);
    if (direction === 1 && nextStep !== step) addNotification("Next station unlocked", `${screens[nextStep] === "ai" ? "The AI Scope Studio" : screens[nextStep] === "summary" ? "Your approval-ready scope" : "Continue shaping the brief"} is ready.`, "route");
  };

  const generateRecommendations = () => {
    if (outcome.trim().length < 10) {
      toast.error("Add a little more detail about the outcome before generating suggestions.");
      return;
    }
    if (projectId === "custom" && customIdea.trim().length < 5) {
      toast.error("Describe the custom product idea so the suggestions can be specific.");
      return;
    }
    addNotification("AI is shaping your route", "We are turning your project context into selectable build additions.", "route");
    recommendationMutation.mutate({ projectType: projectId, customIdea: projectId === "custom" ? customIdea.trim() : undefined, projectName: projectName.trim() || undefined, outcome: outcome.trim() });
  };

  const toggleRecommendation = (id: string) => {
    const item = aiResult?.recommendations.find((recommendation) => recommendation.id === id);
    const willAdd = !selectedRecommendationIds.includes(id);
    setSelectedRecommendationIds((items) => willAdd ? [...items, id] : items.filter((itemId) => itemId !== id));
    if (item) addNotification(willAdd ? "Added to your route" : "Removed from your route", willAdd ? `${item.name} adds ${formatINR(item.price)} to your estimate.` : `${item.name} is no longer in the estimate.`, "added");
  };

  const sendScope = () => {
    if (!aiResult) return;
    const additions = selectedRecommendations.length ? selectedRecommendations.map((item) => `${item.name} (${formatINR(item.price)})`).join(", ") : "No paid additions selected";
    const included = aiResult.included.map((item) => item.name).join(", ");
    const subject = encodeURIComponent(`ScopeFlow AI scope request — ${projectName || project.name}`);
    const body = encodeURIComponent(`Hello,\n\nI would like an approval-ready AI-assisted scope for this project.\n\nProject: ${projectName || "To be named"}\nProject type: ${project.name}${projectId === "custom" ? `\nCustom idea: ${customIdea}` : ""}\nDesired outcome: ${outcome}\n\nAI project summary: ${aiResult.projectSummary}\n\nBase build: ${formatINR(project.price)}\nIncluded: ${included}\nSelected additions: ${additions}\n\nCurrent scope total: ${formatINR(total)}\n\nPlease send the final proposal and next steps.`);
    addNotification("Formal scope ready", "Your AI-assisted scope request is ready to open in your email app.", "ready");
    toast.success("Your itemised AI scope is ready to send.");
    window.setTimeout(() => { window.location.href = `mailto:hello@scopeflow.studio?subject=${subject}&body=${body}`; }, 400);
  };

  const resetFlow = () => { setStep(0); setProjectId("website"); setProjectName(""); setCustomIdea(""); setOutcome(""); setAiResult(null); setSelectedRecommendationIds([]); addNotification("Route reset", "Your choices are cleared and a fresh AI-guided route is ready.", "route"); };
  const stepTitle = currentScreen === "path" ? "Pick your path" : currentScreen === "brief" ? "Shape the brief" : currentScreen === "ai" ? "AI Scope Studio" : "Your scope";

  return (
    <div className="sfw-page">
      <div className="sfw-shell">
        <header className="sfw-header"><a className="sfw-brand" href="#top" onClick={resetFlow} aria-label="Start ScopeFlow again"><img src="/manus-storage/scopeflow-mela-mark_dd71e771.png" alt="" /><b>scopeflow</b><span>Clear scope for independent builders</span></a><div className="sfw-header-actions"><div className="sfw-header-meta"><i /> AI + INR pricing</div><NotificationTray notifications={notifications} open={notificationsOpen} onToggle={() => setNotificationsOpen((open) => !open)} onMarkRead={() => setNotifications((items) => items.map((item) => ({ ...item, unread: false })))} onDismiss={(id) => setNotifications((items) => items.filter((item) => item.id !== id))} /></div></header>
        <nav className="sfw-progress" aria-label="Onboarding progress"><div className="sfw-progress-track">{screens.map((screen, index) => <div style={{ display: "contents" }} key={screen}><div className={`sfw-progress-item ${index === step ? "is-active" : ""} ${index < step ? "is-done" : ""}`}><span>{index < step ? <Check size={11} strokeWidth={3} /> : String(index + 1).padStart(2, "0")}</span>{screen === "path" ? "Path" : screen === "brief" ? "Brief" : screen === "ai" ? "AI picks" : "Scope"}</div>{index < screens.length - 1 && <i className="sfw-progress-join" />}</div>)}</div></nav>

        <div className="sfw-layout" id="top">
          <aside className="sfw-aside"><div className="sfw-aside-inner"><p className="sfw-kicker">A project needs a route</p><h1>Every <em>yes</em> needs a place.</h1><p>Tell us the outcome, then let the AI suggest a tailored menu of real build decisions with each INR fee visible.</p><div className="sfw-aside-visual"><img src="/manus-storage/scopeflow-mela-options_b48090fb.jpg" alt="Abstract colourful tokens arranged as modular project choices" /><span><WandSparkles size={11} /> AI-assisted route</span></div></div></aside>

          <main className="sfw-main">
            <section className="sfw-card sfw-animate" aria-labelledby="screen-title">
              <div className="sfw-card-head"><p><span className="sfw-station-badge">{String(step + 1).padStart(2, "0")}</span> Station · {stepTitle}</p><span className="sfw-step-number">{String(step + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</span></div>
              <div className="sfw-card-body">
                {currentScreen === "path" && <div><p className="sfw-kicker">First, the shape</p><h2 id="screen-title">What are we <span className="sfw-emphasis">building?</span></h2><p className="sfw-screen-intro">Choose the closest route—or bring something entirely different. The AI Scope Studio turns the project context into a new list of selectable options; it does not reuse a fixed menu.</p><div className="sfw-project-grid">{PROJECTS.map((item, index) => <button className={`sfw-project ${projectId === item.id ? "is-selected" : ""}`} type="button" key={item.id} onClick={() => selectProject(item.id)} aria-pressed={projectId === item.id}><span className="sfw-project-top"><span>{projectId === item.id ? <Check size={13} strokeWidth={3} /> : `0${index + 1}`}</span></span><strong>{item.name}</strong><small>{item.caption}</small><span className="sfw-project-price">from {formatINR(item.price)}</span></button>)}</div></div>}

                {currentScreen === "brief" && <div><p className="sfw-kicker">Give the AI context</p><h2 id="screen-title">What needs to be <span className="sfw-emphasis">true</span> at launch?</h2><p className="sfw-screen-intro">Use clear, everyday language. This is how the AI decides whether an option such as Google sign-in, Razorpay, role-based access, deployment, or something more specific earns a place on your route.</p><div className="sfw-fields"><div className="sfw-field"><label htmlFor="projectName">Project name</label><input id="projectName" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="For example, Poppy Studio" /></div>{projectId === "custom" && <div className="sfw-field"><label htmlFor="customIdea">What are you building?</label><input id="customIdea" value={customIdea} onChange={(event) => setCustomIdea(event.target.value)} placeholder="For example, hospital management system" /></div>}<div className={`sfw-field ${projectId === "custom" ? "sfw-field--wide" : "sfw-field--wide"}`}><label htmlFor="outcome">The outcome you want</label><textarea id="outcome" value={outcome} onChange={(event) => setOutcome(event.target.value)} placeholder="For example, make appointments, patient records and billing easier for an outpatient clinic team." /></div></div><div className="sfw-feature-note"><FileText size={18} /><p><b>Project detail powers the suggestions.</b> The AI will create options from this context, then you choose exactly what should be included in the scope.</p></div></div>}

                {currentScreen === "ai" && <div><p className="sfw-kicker">Tailored, not templated</p><h2 id="screen-title">Let the route <span className="sfw-emphasis">think with you.</span></h2><p className="sfw-screen-intro">ScopeFlow’s AI reads your project type and launch outcome, then proposes a focused set of selectable additions. The suggestions are not automatically included; every one stays your decision.</p>{!aiResult && <div className="sfw-ai-empty"><span className="sfw-ai-orb"><WandSparkles size={27} /></span><div><strong>{recommendationMutation.isPending ? "Shaping your custom scope…" : "Ready for the first set of suggestions?"}</strong><p>{recommendationMutation.isPending ? "Looking at the project context and matching it to practical build additions." : "We’ll generate distinct options with fixed INR price bands for this exact project."}</p><button className="sfw-button sfw-button--primary" type="button" disabled={recommendationMutation.isPending} onClick={generateRecommendations}>{recommendationMutation.isPending ? "Generating…" : "Generate AI suggestions"} <WandSparkles size={15} /></button></div></div>}{aiResult && <div className="sfw-ai-results"><div className="sfw-ai-summary"><span><Sparkles size={15} /></span><p><b>AI read of the route:</b> {aiResult.projectSummary}</p><button className="sfw-ai-regenerate" type="button" onClick={generateRecommendations} disabled={recommendationMutation.isPending}>{recommendationMutation.isPending ? "Refreshing…" : "Refresh suggestions"}</button></div><p className="sfw-ai-select-label"><Lightbulb size={14} /> Choose what belongs in this build</p><div className="sfw-option-grid">{aiResult.recommendations.map((item, index) => { const selected = selectedRecommendationIds.includes(item.id); return <button className={`sfw-option sfw-ai-option ${selected ? "is-selected" : ""}`} type="button" key={item.id} onClick={() => toggleRecommendation(item.id)} aria-pressed={selected}><span className="sfw-option-mark">{selected ? <Check size={14} strokeWidth={3} /> : `0${index + 1}`}</span><span><span className="sfw-option-title">{item.name}{item.recommended && <em>AI pick</em>}</span><span className="sfw-option-copy">{item.description}</span><span className="sfw-ai-reason">Why this may help: {item.reason}</span></span><span className="sfw-option-cost">+{formatINR(item.price)}</span></button>; })}</div></div>}</div>}

                {currentScreen === "summary" && <div><p className="sfw-kicker">Your approval-ready route</p><h2 id="screen-title">This is the <span className="sfw-emphasis">work.</span></h2><p className="sfw-screen-intro">The AI made suggestions, but the scope only includes the decisions you actively selected. Take this itemised route to a proposal or send it directly as a request.</p>{aiResult ? <><div className="sfw-summary"><div className="sfw-summary-card"><h3>Included in your AI-shaped foundation</h3><div className="sfw-summary-list">{aiResult.included.map((item) => <div className="sfw-summary-row" key={item.name}><span><b>{item.name}</b><small>{item.description}</small></span><b>Included</b></div>)}</div></div><div className="sfw-total-card"><p>Current INR estimate</p><h3>{projectName || `${project.name} project`}</h3><strong className="sfw-total-price">{formatINR(total)}</strong><small>Excludes applicable taxes, domain renewals, payment-provider charges, and any new work requested after this scope is approved.</small></div></div><div className="sfw-summary-card" style={{ marginTop: 17 }}><h3>AI suggestions you selected</h3><div className="sfw-summary-list">{selectedRecommendations.length ? selectedRecommendations.map((item) => <div className="sfw-summary-row" key={item.id}><span>{item.name}</span><b className="is-extra">+{formatINR(item.price)}</b></div>) : <p className="sfw-summary-empty">No AI additions selected. Your estimate currently includes the AI-shaped project foundation.</p>}</div></div></> : <div className="sfw-ai-empty"><span className="sfw-ai-orb"><Cloud size={26} /></span><div><strong>Your AI suggestions are not ready yet.</strong><p>Go back to the AI Scope Studio, generate a tailored set, then return here to review a real itemised scope.</p></div></div>}</div>}
              </div>

              {currentScreen !== "summary" && <div className="sfw-total-ticket"><span className="sfw-ticket-route">Fare<br />on route</span><span className="sfw-ticket-label">Current INR scope</span><b>{formatINR(total)}</b></div>}
              <div className="sfw-card-footer">{step > 0 ? <button type="button" className="sfw-button sfw-button--ghost" onClick={() => move(-1)}><ArrowLeft size={14} /> Previous stop</button> : <button type="button" className="sfw-button sfw-button--ghost" onClick={resetFlow}>Start over</button>}{currentScreen === "summary" ? <button type="button" className="sfw-button sfw-button--primary" onClick={sendScope} disabled={!aiResult}>Request formal scope <Mail size={14} /></button> : currentScreen === "ai" && !aiResult ? <button type="button" className="sfw-button sfw-button--primary" onClick={generateRecommendations} disabled={recommendationMutation.isPending}>{recommendationMutation.isPending ? "Generating…" : "Generate AI suggestions"} <WandSparkles size={14} /></button> : <button type="button" className="sfw-button sfw-button--primary" onClick={() => move(1)}>{currentScreen === "ai" ? "Review scope" : "Next stop"} <ArrowRight size={14} /></button>}</div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function NotificationTray({ notifications, open, onToggle, onMarkRead, onDismiss }: { notifications: RouteNotice[]; open: boolean; onToggle: () => void; onMarkRead: () => void; onDismiss: (id: number) => void; }) {
  const unread = notifications.filter((notice) => notice.unread).length;
  return <div className="sfw-notice-wrap"><button type="button" className="sfw-notice-trigger" onClick={onToggle} aria-label={`Open Route Dispatch notifications${unread ? `, ${unread} unread` : ""}`} aria-expanded={open}><Bell size={17} strokeWidth={2.4} />{unread > 0 && <span className="sfw-notice-count">{unread > 9 ? "9+" : unread}</span>}</button>{open && <section className="sfw-notice-tray" aria-label="Route Dispatch notifications"><div className="sfw-notice-head"><div><strong>Route Dispatch</strong><small>Decisions, delivered clearly</small></div><button type="button" className="sfw-notice-read" onClick={onMarkRead}>Mark all read</button></div><div className="sfw-notice-list">{notifications.length ? notifications.map((notice, index) => <article className={`sfw-notice ${notice.unread ? "is-unread" : ""}`} data-kind={notice.kind} key={notice.id}><span className="sfw-notice-route">{String(index + 1).padStart(2, "0")}</span><div className="sfw-notice-copy"><strong>{notice.title}</strong><p>{notice.description}</p></div><button type="button" className="sfw-notice-dismiss" onClick={() => onDismiss(notice.id)} aria-label={`Dismiss ${notice.title}`}><X size={13} /></button></article>) : <p className="sfw-summary-empty" style={{ margin: "0 14px" }}>No route updates waiting for you.</p>}</div></section>}</div>;
}
