# Multi-Screen Wizard Validation Notes

The live e-commerce route was exercised from category choice through the final scope screen. Selecting **E-commerce** expanded the route from six to seven screens and revealed the dedicated **Payments** station. The flow correctly preserved the selected category across screens.

The tested path selected **Google + email login** at ₹18,000, **Razorpay payments** at ₹18,000, **Managed app deployment** at ₹12,000, and **Conversion copywriting** at ₹18,000. The visible estimate changed from the ₹95,000 e-commerce foundation to **₹1,61,000**, and the final scope itemised the four selected paid additions alongside the included storefront, product/cart/checkout experience, and normal email/password login.

The route labels, progress indicator, fare-ticket estimate, previous/next controls, and final request action were visible at each tested step. Desktop visual review confirmed that the interaction remains visually differentiated and retains the Project Mela route-and-ticket language.

## Custom Notification Validation

The new **Route Dispatch** notification control is visible in the live wizard header with an unread badge. Opening the control reveals an in-product feed containing its route marker, notification title, explanatory copy, a **Mark all read** action, and a per-notification dismissal button. The notification control is a native button with an accessible label that includes the unread count; the feed actions are also semantic buttons.

Selecting the e-commerce category generated a new **Route changed** notification with the correct ₹95,000 foundation price, and the unread count rose from one to two. The **Mark all read** control cleared the unread badge without changing the route or removing feed entries.

The individual dismissal action removed the selected route-change notification while preserving the remaining entry. The notification-enabled wizard was also captured at desktop and mobile widths; the bell control remains visible on small screens while the wider INR status text appropriately gives way to preserve the onboarding canvas.

## AI Scope Studio Validation

The upgraded wizard successfully exposes a **Custom build** route and carries the category forward to a dedicated brief screen. The live test entered a project named **Aarogya Clinic Operations**, described as a hospital management system for outpatient clinics, with an outcome focused on appointments, patient records, billing, and staff handovers. The next validation step is to generate and inspect the server-side AI recommendation response.

The first live AI recommendation request returned the designed user-facing fallback message, “We could not generate suggestions just now. Please try again.” The in-product Route Dispatch feed also recorded the attempted request. The failure requires server-side diagnosis before the AI flow can be considered complete.

Diagnosis showed that the initially selected GPT model returned a completion object without message content when called through the integration helper’s generic token parameter. A direct live proxy check confirmed that `claude-haiku-4-5` returns a complete completion using the supported `max_tokens` path, so the AI recommendation procedure now uses that verified model.

After applying the model correction, the live custom-build route was restarted and again reached the custom brief screen with the AI Scope Studio present as the next station. The hospital-management project details are ready to be re-entered before the corrected live recommendation request.

The diagnostic test again reached the **Custom build** brief screen after a full route reset, preserving the expected navigation structure and showing the project name, custom-idea, and outcome inputs required for dynamic recommendation generation.

The representative hospital-management detail was re-entered successfully and preserved when progressing from the brief to the AI Scope Studio. The live test is ready to submit the corrected server-side recommendation request.

Following the INR enum-contract correction, the custom-build route was reset and selected again. The project foundation correctly updated to ₹79,000 while the wizard prepared the hospital-management brief for a final AI generation attempt.

The completed hospital-management brief reached the AI Scope Studio, and the live generation request entered the intended disabled **Generating… / Shaping your custom scope…** state. The next check will confirm the generated recommendation cards and final scope integration.

The live AI request completed successfully for the hospital-management example. It generated six tailored selectable additions, including an Advanced Appointment Desk, Enhanced Patient Records, Billing and Collection Reports, Staff Handover Workspace, Clinic Data Import, and an Operations Dashboard. Selecting the ₹24,000 Advanced Appointment Desk updated the visible scope estimate from ₹79,000 to **₹1,03,000**.

The final approval-ready summary successfully retained the AI-shaped included foundation and the explicitly selected Advanced Appointment Desk. It displayed the expected itemised ₹1,03,000 estimate, confirming that tailored AI recommendations can be selected, priced in INR, and carried into the formal scope view.

The wizard was reset and the **E-commerce** route was selected for a second dynamic recommendation test. Its AI-assisted starting estimate correctly changed to ₹95,000 before the brief and recommendation generation steps.

For the e-commerce validation, the project was named **Buniyaad Home Store** and given an outcome that explicitly includes curated collections, online payment, and order updates. This context is ready for a tailored AI suggestion run that should surface relevant payment and operations additions rather than reuse the hospital-management recommendations.

The live e-commerce recommendation request entered the intended loading state in the AI Scope Studio, retaining the ₹95,000 foundation estimate while the server generates a new tailored recommendation set.

The e-commerce AI request completed successfully with a different, commerce-specific six-item menu. It included **Razorpay online payments** (₹16,000), shipping and delivery tracking, customer accounts and order history, catalogue operations, product discovery, and order-status notifications. This verifies that the recommendation engine generates context-specific payment and operations additions rather than reusing the custom hospital-management menu.

The standard **Website** route was also restarted and reached its brief screen with its correct ₹59,000 foundation. The final route check will generate a normal website-specific set from a fresh launch outcome.

The standard website brief was entered for Nila Advisory and successfully moved into the AI Scope Studio. Its route retains the expected ₹59,000 foundation estimate and is ready for dynamic recommendation generation.

The standard website AI request completed successfully with a distinct six-item advisory-site menu: founder qualification, intro-call booking, a case-study library, SEO foundation, conversion analytics, and a founder-proof content module. This confirms that website recommendations are also generated from the current brief rather than copied from another project type. The prompt was then tightened to prevent the AI from proposing testimonials, ratings, reviews, customer quotes, invented outcomes, or sample social-proof content.

The **Web app** route was selected for the final route test. Its foundation accurately updated to ₹89,000, ready for a product workflow brief and a fresh dynamic recommendation response.

The web-app brief was entered for **FieldOps Hub**, with a real operations workflow covering work assignment, field updates, completed-job approval, and team performance. The AI Scope Studio is ready to generate a distinct web-app recommendation set from this project context.

The FieldOps web-app request entered the intended AI loading state while retaining the ₹89,000 foundation estimate. This confirms the remaining route also invokes the same server-side dynamic recommendation flow.

The FieldOps web-app request completed successfully with five workflow-specific recommendations: live notifications, maps and location tracking, a configurable approval workflow, performance reports, and data import/export. This completes live dynamic recommendation checks for website, web app, e-commerce, and custom hospital-management routes. The refreshed AI-guided entry experience was also captured at desktop and mobile viewport sizes; the route controls and mobile header remain readable at the tested sizes.

The corrected model still returned the fallback state after the live hospital-management request. This indicates the issue is likely in the structured response contract or the model response processing, rather than in the client flow or base model connectivity. The procedure needs a focused server-side adjustment before another live test.

A direct structured-output probe confirmed that the verified model can return JSON matching a strict schema. Defensive response diagnostics were added to the server procedure to expose any difference between the direct proxy response and the application request without sending raw provider data to the client.

The diagnostic showed the exact cause: the structured-output provider accepts enum values only as strings or null, while the first recommendation schema used numeric INR price-band values. The server contract now exposes the approved bands as string enums and converts them to numeric INR values only after validating the AI response.
