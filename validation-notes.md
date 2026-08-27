# Multi-Screen Wizard Validation Notes

The live e-commerce route was exercised from category choice through the final scope screen. Selecting **E-commerce** expanded the route from six to seven screens and revealed the dedicated **Payments** station. The flow correctly preserved the selected category across screens.

The tested path selected **Google + email login** at ₹18,000, **Razorpay payments** at ₹18,000, **Managed app deployment** at ₹12,000, and **Conversion copywriting** at ₹18,000. The visible estimate changed from the ₹95,000 e-commerce foundation to **₹1,61,000**, and the final scope itemised the four selected paid additions alongside the included storefront, product/cart/checkout experience, and normal email/password login.

The route labels, progress indicator, fare-ticket estimate, previous/next controls, and final request action were visible at each tested step. Desktop visual review confirmed that the interaction remains visually differentiated and retains the Project Mela route-and-ticket language.

## Custom Notification Validation

The new **Route Dispatch** notification control is visible in the live wizard header with an unread badge. Opening the control reveals an in-product feed containing its route marker, notification title, explanatory copy, a **Mark all read** action, and a per-notification dismissal button. The notification control is a native button with an accessible label that includes the unread count; the feed actions are also semantic buttons.

Selecting the e-commerce category generated a new **Route changed** notification with the correct ₹95,000 foundation price, and the unread count rose from one to two. The **Mark all read** control cleared the unread badge without changing the route or removing feed entries.

The individual dismissal action removed the selected route-change notification while preserving the remaining entry. The notification-enabled wizard was also captured at desktop and mobile widths; the bell control remains visible on small screens while the wider INR status text appropriately gives way to preserve the onboarding canvas.
