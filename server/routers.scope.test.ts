import { describe, expect, it } from "vitest";
import { buildScopeRecommendationPrompt, normalizeAIRecommendations } from "./routers";

describe("AI scope recommendation safeguards", () => {
  it("preserves only approved fixed INR price bands in its normalized output", () => {
    const result = normalizeAIRecommendations({
      projectSummary: "A focused e-commerce store for a growing artisan brand.",
      included: [
        { name: "Storefront", description: "Responsive collection and product pages." },
        { name: "Core checkout path", description: "Cart and pre-payment checkout journey." },
      ],
      recommendations: [
        { id: "razorpay", kind: "payments", name: "Razorpay integration", description: "Connect one-time online payments.", reason: "Lets customers complete checkout.", priceBand: "18000", recommended: true },
        { id: "analytics", kind: "insight", name: "Store analytics", description: "Track the moments that convert.", reason: "Makes trading decisions easier.", priceBand: "12000", recommended: false },
        { id: "shipping", kind: "operations", name: "Shipping workflow", description: "Surface delivery choices at checkout.", reason: "Keeps fulfilment expectations clear.", priceBand: "16000", recommended: true },
        { id: "seo", kind: "discovery", name: "Technical SEO pass", description: "Prepare key pages for discovery.", reason: "Supports a stronger launch foundation.", priceBand: "8000", recommended: false },
      ],
    });

    expect(result.recommendations.map((item) => item.price)).toEqual([18000, 12000, 16000, 8000]);
    expect(result.recommendations[0]?.id).toBe("razorpay-1");
  });

  it("asks the model to tailor recommendations to a custom hospital-management concept without making compliance claims", () => {
    const prompt = buildScopeRecommendationPrompt({ projectType: "custom", customIdea: "Hospital management system for outpatient clinics", outcome: "Make appointments, records, and billing easier to manage." });

    expect(prompt).toContain("Hospital management system");
    expect(prompt).toContain("not as compliance guarantees");
    expect(prompt).toContain("8000, 12000, 16000, 18000, 24000, 32000, or 40000");
  });
});
