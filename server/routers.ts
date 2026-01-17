import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Calls Router
  calls: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCallsByCompany(input.companyId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          companyId: z.number(),
          callerId: z.string(),
          callerName: z.string().optional(),
          receiverId: z.string().optional(),
          receiverName: z.string().optional(),
          duration: z.number().default(0),
          status: z.enum(["completed", "missed", "rejected", "ongoing"]).default("completed"),
          direction: z.enum(["inbound", "outbound"]),
          number: z.string().optional(),
          startTime: z.date(),
          endTime: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createCall(input);
      }),
  }),

  // Messages Router
  messages: router({
    list: protectedProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ input }) => {
        return await db.getMessagesByConversation(input.conversationId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          companyId: z.number(),
          conversationId: z.number(),
          senderId: z.string(),
          senderName: z.string().optional(),
          content: z.string(),
          channel: z.enum(["whatsapp", "instagram", "telegram", "messenger", "email", "sms"]),
          messageType: z.enum(["text", "image", "video", "audio", "file"]).default("text"),
          attachmentUrl: z.string().optional(),
          status: z.enum(["sent", "delivered", "read", "failed"]).default("sent"),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createMessage(input);
      }),
  }),

  // Conversations Router
  conversations: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getConversationsByCompany(input.companyId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          companyId: z.number(),
          customerId: z.string(),
          customerName: z.string().optional(),
          customerPhone: z.string().optional(),
          customerEmail: z.string().optional(),
          assignedTo: z.number().optional(),
          channels: z.string().optional(),
          status: z.enum(["active", "closed", "pending", "resolved"]).default("active"),
          priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createConversation(input);
      }),
  }),

  // Unified Numbers Router
  numbers: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getNumbersByCompany(input.companyId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          companyId: z.number(),
          number: z.string(),
          numberType: z.enum(["unified_9200", "toll_free_800", "landline", "mobile"]),
          country: z.string().default("SA"),
          status: z.enum(["active", "inactive", "suspended"]).default("active"),
          assignedTo: z.number().optional(),
          ivr: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createUnifiedNumber(input);
      }),
  }),

  // Reports Router
  reports: router({
    list: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getReportsByCompany(input.companyId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          companyId: z.number(),
          reportType: z.enum(["calls", "messages", "team_performance", "customer_satisfaction", "revenue"]),
          title: z.string(),
          data: z.string().optional(),
          period: z.enum(["daily", "weekly", "monthly", "yearly", "custom"]).default("daily"),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          createdBy: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createReport(input);
      }),
  }),

  // Subscriptions Router
  subscriptions: router({
    get: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getSubscriptionByCompany(input.companyId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          companyId: z.number(),
          planName: z.string(),
          planPrice: z.number(),
          billingCycle: z.enum(["monthly", "yearly"]).default("monthly"),
          status: z.enum(["active", "inactive", "suspended", "cancelled"]).default("active"),
          stripeCustomerId: z.string().optional(),
          stripeSubscriptionId: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createSubscription(input);
      }),
  }),

  // Companies Router
  companies: router({
    get: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCompanyById(input.companyId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          website: z.string().optional(),
          industry: z.string().optional(),
          country: z.string().default("SA"),
          status: z.enum(["active", "inactive", "trial", "suspended"]).default("trial"),
          ownerId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createCompany(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
