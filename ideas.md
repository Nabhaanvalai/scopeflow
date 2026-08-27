# ScopeFlow Redesign — India-First Direction

## Three Possible Approaches

### 1. Project Mela
**Very Brief Intro:** A generous, optimistic interface inspired by modern Indian print culture and public wayfinding. Bright color blocking, oversized type, and clear interactive “stations” make the onboarding journey feel active and welcoming.

**Probability:** 0.043

### 2. Quiet Charter
**Very Brief Intro:** An understated luxury workspace with dark teak, silk-like neutrals, and careful document rituals. It makes the agreement feel serious, private, and considered.

**Probability:** 0.068

### 3. Soft Systems
**Very Brief Intro:** A near-future, pastel product landscape built from floating modules and conversational prompts. The experience is friendly and adaptive, with an emphasis on ease over formality.

**Probability:** 0.019

## Chosen Approach — Project Mela

### Design Movement
**Contemporary Indian graphic modernism meets transit wayfinding.** The visual language takes the confidence, hand-made geometry, and celebratory color of Indian print culture and combines it with the immediate legibility of a well-designed metro interchange. This is not a generic SaaS application, an editorial ledger, or a conventional dashboard.

### Core Principles
1. **Make the flow feel alive:** The interface is a sequence of expressive stations, not a form in a box.
2. **Use color as wayfinding:** Saffron, cobalt, marigold, and leaf green help clients understand what is being chosen, reviewed, or locked.
3. **Build for collective clarity:** Every prompt is phrased for a conversation between freelancer and client, not as an impersonal database field.
4. **Give value a visible place:** INR prices sit beside choices, with no detached billing page or hidden calculation.

### Color Philosophy
The redesign uses a rich **midnight indigo** as the composed anchor, paired with marigold yellow for energy, chilli red for deliberate decisions, soft lime for positive momentum, and a warm milk-paper ground to keep the interface human. The colors are flat and intentional rather than gradient-driven. The signature color is **Mela Marigold #F8BD39**: celebratory, bright, and unmistakably ScopeFlow.

### Layout Paradigm
The page behaves like a **route map through a creative fair**. A broad canvas contains large, varied “stations” that are threaded by a dotted route. The first station is a full-width statement and project prompt; later stations arrange a conversation card, choice tiles, and a sticky, ticket-shaped scope total. There is no sidebar rail and no conventional marketing navigation.

### Signature Elements
1. A dotted “scope route” with numbered waypoints connecting each decision station.
2. Ticket-edge perforations on the live total and approval panel.
3. Colorful abstract ribbons, sunbursts, and corner motifs that reinforce movement without becoming decoration for its own sake.

### Interaction Philosophy
Every action should feel like placing a clear marker on the route. Users select a project type with bold tiles, add extras through direct switches, and see the ticket total update immediately. No action is buried in a menu. The visual feedback is crisp and candid: a state changes color, gains a check, and updates the shared plan.

### Animation
Use a single route-drawing reveal on initial load, then short 150–220ms position and color transitions. Add-on selections use a 4px upward nudge and a checkmark fade; the ticket total has a brief tabular-numeric pulse. All motion is optional, uses transform/opacity only, and is removed for reduced-motion preferences.

### Typography System
**Bricolage Grotesque** drives the expressive display treatment with wide, confident, slightly irregular letterforms. **DM Sans** supports all controls, labels, and long-form text for excellent readability. Headlines are oversized, left-aligned, and allowed to wrap naturally. Metadata is compact and precise, using uppercase tracking only where it aids navigation.

### Brand Essence
**ScopeFlow is the shared project route for Indian independent builders and their clients—turning “can we also” into a visible decision with an INR price.**

Personality: **Vibrant, candid, directional.**

### Brand Voice
The voice is warm, decisive, and collaborative. It uses simple conversational language while making commercial boundaries clear.

> “Start with the work that earns its place.”

> “Put it on the route. We’ll show the price.”

### Wordmark & Logo
The mark is a thick marigold route line that loops through a cobalt square and ends in a pointed arrow, communicating a project path that keeps moving forward. The logotype is confident, all-lowercase Bricolage Grotesque, with the mark taking visual precedence.

### Signature Brand Color
**Mela Marigold — #F8BD39.**

## India-First Commercial Model

All visible prices use **Indian rupees (INR)** with the `₹` symbol and Indian digit grouping. The working model begins with a clear core build price of **₹79,000**. Optional additions are priced individually and surfaced beside the scope decision: conversion copywriting at **₹18,000**, a starter identity at **₹24,000**, an editing space at **₹16,000**, analytics at **₹9,000**, and a technical SEO pass at **₹14,000**. Prices are illustrative website copy and remain easy to revise from one data list.

## Multi-Screen Onboarding Product Contract

ScopeFlow now functions as an actual onboarding wizard rather than a single-page catalogue. It opens immediately in a focused multi-screen flow that carries each selection forward and allows users to move backward without losing choices. The Project Mela color system stays in place, but its route-map idea is expressed through a compact top progress route and a series of large, changing decision cards—not a persistent side rail or landing-page navigation.

| Screen | Purpose | Decision model |
| --- | --- | --- |
| 1. Pick your path | Establish the build category. | Website, web app, e-commerce, or refresh; each shows a different starting price and plain-language default scope. |
| 2. Shape the brief | Capture the project name and intended outcome. | Freeform detail that is carried into the final scope request. |
| 3. Accounts & access | Price authentication accurately. | No member area, email/password login **included**, Google sign-in extra, or Google plus email/password extra. |
| 4. Payments | Only appears for e-commerce and web-app projects. | No payment flow, Razorpay, Stripe, or subscription checkout; each non-default choice has a fixed INR fee. |
| 5. Launch path | Clarify delivery and deployment. | Source-code handover is **included**; in-app managed deployment, custom-domain connection, and launch monitoring are paid additions. |
| 6. Useful extras | Offer the non-essential features that commonly change scope. | Category-aware feature cards, each with its own INR price and clear effect on the build. |
| 7. Your scope | Create an itemized, approval-ready overview. | Shows base build, included features, selected additions, total, and a prefilled email request. |

The commercial model uses these illustrative starting prices: website **₹59,000**, web app **₹89,000**, e-commerce **₹95,000**, and refresh **₹38,000**. The final interface will consistently label the normal email/password login and source-code handover as **included**, while Google authentication, payment integration, managed app deployment, and every elective feature appear as fixed INR additions.

## Style Decisions

- Each decision screen is a numbered **station** on the same visible route, with directional wayfinding and dotted connections rather than isolated form cards.
- The running INR estimate is a perforated **fare ticket** with marigold as its dominant commercial signal, not a conventional footer bar.
- The ScopeFlow route mark is treated as a primary visual asset, with a larger cobalt-and-marigold symbol in the header and a clear graphic relationship to the route indicators.
- Choice tiles use bolder poster-like color fields, confident numerals, and expressive corner motifs while retaining the readability required for a commercial decision.

## Custom Notification Pattern

The wizard gains a local **Route Dispatch** notification system rather than relying only on generic transient messages. A bell in the header exposes a compact, keyboard-accessible notification feed that carries the Project Mela visual language: numbered route markers, marigold action color, cobalt text, and small directional arrows. The feed is useful rather than ornamental; it confirms when a route changes, when a paid or included option is selected, when an optional extra is added or removed, when progress is reset, and when the formal scope request is prepared.

Notifications are session-local in this frontend version. They do not claim to send email, push alerts, WhatsApp messages, or other external notifications. A later backend upgrade can persist these events and deliver notifications outside the browser.
