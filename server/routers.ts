import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

/** AI-backed scope recommendation contract. The model can recommend ideas, but the commercial price must use an approved INR band. */
const priceBands = ["8000", "12000", "16000", "18000", "24000", "32000", "40000"] as const;
const priceBandSchema = z.enum(priceBands);

const aiOutputSchema = z.object({
  projectSummary: z.string().min(12).max(220),
  included: z.array(z.object({
    name: z.string().min(2).max(70),
    description: z.string().min(8).max(150),
  }).strict()).min(2).max(4),
  recommendations: z.array(z.object({
    id: z.string().min(2).max(48),
    kind: z.string().min(2).max(40),
    name: z.string().min(2).max(70),
    description: z.string().min(8).max(150),
    reason: z.string().min(8).max(160),
    priceBand: priceBandSchema,
    recommended: z.boolean(),
  }).strict()).min(4).max(7),
}).strict();

type AIOutput = z.infer<typeof aiOutputSchema>;

export function normalizeAIRecommendations(output: AIOutput) {
  return {
    projectSummary: output.projectSummary.trim(),
    included: output.included.map((item) => ({ name: item.name.trim(), description: item.description.trim() })),
    recommendations: output.recommendations.map((item, index) => ({
      id: `${item.id.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-")}-${index + 1}`,
      kind: item.kind.trim(),
      name: item.name.trim(),
      description: item.description.trim(),
      reason: item.reason.trim(),
      price: Number(item.priceBand),
      recommended: item.recommended,
    })),
  };
}

export function buildScopeRecommendationPrompt(input: { projectType: string; customIdea?: string; projectName?: string; outcome: string }) {
  const projectContext = input.projectType === "custom" ? `Custom project idea: ${input.customIdea || "Not provided"}` : `Project category: ${input.projectType}`;
  return `Create a concise scope-recommendation menu for an Indian freelance web and app studio.

${projectContext}
Project name: ${input.projectName || "Not named"}
Desired outcome: ${input.outcome}

Recommend only paid additions that are plausible and useful for this exact product. Do not invent legal, medical, financial, or security compliance claims. If the project is e-commerce, consider provider integrations such as Razorpay, Stripe, shipping, catalogue operations, or customer accounts where useful. If it is a hospital management system, consider operational needs such as roles, appointments, patient records, billing, reports, data import, or deployment—but phrase them as build scope, not as compliance guarantees.

Return 2–4 included foundation items and exactly 4–7 selectable paid additions. Each paid addition must use one approved INR price band: 8000, 12000, 16000, 18000, 24000, 32000, or 40000. Set recommended=true for the 2–3 most important additions. Make names concrete, descriptions short, and reasons helpful. IDs must be simple lowercase kebab-case words. Never mention that you are AI. Never generate testimonials, ratings, reviews, customer quotes, invented outcomes, or sample social-proof content.`;
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  scope: router({
    recommend: publicProcedure
      .input(z.object({
        projectType: z.string().min(2).max(40),
        customIdea: z.string().max(500).optional(),
        projectName: z.string().max(120).optional(),
        outcome: z.string().min(10).max(1000),
      }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          // Claude Haiku was verified against the live proxy to return complete structured content with max_tokens.
          model: "claude-haiku-4-5",
          maxTokens: 1800,
          messages: [
            { role: "system", content: "You are ScopeFlow’s precise product scoping assistant. Respond only with JSON matching the supplied schema." },
            { role: "user", content: buildScopeRecommendationPrompt(input) },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "scope_recommendation",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  projectSummary: { type: "string" },
                  included: {
                    type: "array",
                    minItems: 2,
                    maxItems: 4,
                    items: {
                      type: "object",
                      properties: { name: { type: "string" }, description: { type: "string" } },
                      required: ["name", "description"],
                      additionalProperties: false,
                    },
                  },
                  recommendations: {
                    type: "array",
                    minItems: 4,
                    maxItems: 7,
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" }, kind: { type: "string" }, name: { type: "string" }, description: { type: "string" }, reason: { type: "string" },
                        priceBand: { type: "string", enum: [...priceBands] }, recommended: { type: "boolean" },
                      },
                      required: ["id", "kind", "name", "description", "reason", "priceBand", "recommended"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["projectSummary", "included", "recommendations"],
                additionalProperties: false,
              },
            },
          },
        });

        if (!Array.isArray(response.choices)) {
          console.error("[ScopeFlow AI] Unexpected recommendation response", JSON.stringify(response));
          throw new Error("The recommendation service returned an unexpected response.");
        }

        const content = response.choices[0]?.message.content;
        if (typeof content !== "string") throw new Error("The recommendation service returned an empty response.");
        return normalizeAIRecommendations(aiOutputSchema.parse(JSON.parse(content)));
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
