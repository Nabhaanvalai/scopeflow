# ScopeFlow Design Direction

## Three Possible Approaches

### 1. Project Ledger
**Very Brief Intro:** Editorial, high-contrast operations design inspired by a well-made project brief and a studio workroom. It makes change control feel clear, calm, and financially legible.

**Probability:** 0.037

### 2. Warm Atelier
**Very Brief Intro:** A tactile, craft-led direction with paper textures, quiet colors, and refined typography. It positions a freelance engagement as bespoke creative work.

**Probability:** 0.081

### 3. Signal Console
**Very Brief Intro:** A dense, dark interface with electric status signals and a modular command-center feel. It emphasizes speed, technical delivery, and process certainty.

**Probability:** 0.024

## Chosen Approach — Project Ledger

### Design Movement
**Swiss editorial design meets modern product operations.** ScopeFlow should feel like a concise, beautifully produced project ledger rather than a generic SaaS dashboard or a marketing template.

### Core Principles
1. **Clarity before decoration:** Every visual device must make project scope, cost, or status easier to read.
2. **Structured asymmetry:** The layout uses a persistent vertical rail and deliberately offset content blocks rather than centered feature grids.
3. **Confident reduction:** Use large typographic statements, limited colors, generous breathing room, and only purposeful interface chrome.
4. **Agreement as a product:** Scope lock, approved add-ons, and a signed-off path are presented as the heart of the experience.

### Color Philosophy
The base is a warm paper white to convey calm and trust. Ink black provides the seriousness of a contract. An ownable **vermilion red** signals action, change, and commercial clarity—not urgency. Small moss-green status moments convey decisions that have been documented and approved. This palette deliberately avoids familiar blue SaaS cues.

### Layout Paradigm
A **ledger rail** runs down the left side of the desktop canvas and carries identity, project stage, and the primary action. The right field holds fluid content that alternates between oversized editorial messages and operational cards. On mobile, the rail compresses into a compact top ledger strip so the journey remains legible.

### Signature Elements
1. A vertical stage ledger with numbered milestones and a current-stage marker.
2. Stamped status labels such as “SCOPE LOCKED” and “ADDED TO BRIEF.”
3. Fine red registration lines and micro-grid paper texture that reference a designer’s working document.

### Interaction Philosophy
Interactions should feel like updating a living brief: choices toggle decisively, totals update immediately, and the approval moment feels deliberate. Controls avoid bouncy novelty; they should respond in a precise, physical 160–220ms rhythm.

### Animation
Use restrained transform-and-opacity entrances for primary content, staggered by 45ms. Cards translate 6px on hover, selected add-ons receive a crisp color transition, and the total uses a short tabular-number emphasis when it changes. Respect reduced-motion preferences and avoid continuous decorative motion.

### Typography System
**DM Serif Display** is used sparingly for project-defining statements and numbered stages. **Manrope** carries navigation, controls, costs, metadata, and body copy. Headlines are high-contrast and compact; UI text uses 11–14px uppercase labels with generous tracking, and readable 15–17px body text.

### Brand Essence
**ScopeFlow is the client-ready project ledger that gives independent builders a clear, paid path from first conversation to signed scope.**

Personality: **Decisive, composed, exacting.**

### Brand Voice
The voice is direct, respectful, and commercially transparent. Headlines name the practical benefit; CTAs state the commitment being made.

> “Turn a moving target into a signed plan.”

> “Add it to the brief — see the cost first.”

### Wordmark & Logo
The logo mark is a compact red square split by two offset white ledger lines, suggesting a structured path and documented change. The wordmark pairs a wide, custom-feeling sans treatment of “SCOPE” with a red square dot and “FLOW” in the same line.

### Signature Brand Color
**Ledger Vermilion — #EC4B2E.**

## Product Structure

The homepage is a functional client-facing onboarding canvas. It contains an overview of the engagement, a step-one project starter form, a scoped foundation card, a fixed-price add-on catalog, and a live scope summary. A user can select optional deliverables, see the total update, review the project stages, and send a concise request for a formal scope summary. The experience is intentionally frontend-only: selections are session-local and the final request opens the user’s email client with a prefilled inquiry.
