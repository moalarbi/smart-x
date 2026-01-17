import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here
// Companies Table
export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  website: varchar("website", { length: 255 }),
  industry: varchar("industry", { length: 128 }),
  country: varchar("country", { length: 2 }).default("SA"),
  status: mysqlEnum("status", ["active", "inactive", "trial", "suspended"]).default("trial"),
  ownerId: int("ownerId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

// Calls Table
export const calls = mysqlTable("calls", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  callerId: varchar("callerId", { length: 64 }).notNull(),
  callerName: text("callerName"),
  receiverId: varchar("receiverId", { length: 64 }),
  receiverName: text("receiverName"),
  duration: int("duration").default(0),
  recordingUrl: text("recordingUrl"),
  transcription: text("transcription"),
  status: mysqlEnum("status", ["completed", "missed", "rejected", "ongoing"]).default("completed"),
  direction: mysqlEnum("direction", ["inbound", "outbound"]).notNull(),
  number: varchar("number", { length: 20 }),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Call = typeof calls.$inferSelect;
export type InsertCall = typeof calls.$inferInsert;

// Messages Table
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  conversationId: int("conversationId").notNull(),
  senderId: varchar("senderId", { length: 64 }).notNull(),
  senderName: text("senderName"),
  content: text("content").notNull(),
  channel: mysqlEnum("channel", ["whatsapp", "instagram", "telegram", "messenger", "email", "sms"]).notNull(),
  messageType: mysqlEnum("messageType", ["text", "image", "video", "audio", "file"]).default("text"),
  attachmentUrl: text("attachmentUrl"),
  status: mysqlEnum("status", ["sent", "delivered", "read", "failed"]).default("sent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

// Conversations Table
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  customerId: varchar("customerId", { length: 64 }).notNull(),
  customerName: text("customerName"),
  customerPhone: varchar("customerPhone", { length: 20 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  assignedTo: int("assignedTo"),
  channels: varchar("channels", { length: 255 }),
  lastMessage: text("lastMessage"),
  lastMessageTime: timestamp("lastMessageTime"),
  status: mysqlEnum("status", ["active", "closed", "pending", "resolved"]).default("active"),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

// Unified Numbers Table
export const unifiedNumbers = mysqlTable("unifiedNumbers", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  number: varchar("number", { length: 20 }).notNull().unique(),
  numberType: mysqlEnum("numberType", ["unified_9200", "toll_free_800", "landline", "mobile"]).notNull(),
  country: varchar("country", { length: 2 }).default("SA"),
  status: mysqlEnum("status", ["active", "inactive", "suspended"]).default("active"),
  assignedTo: int("assignedTo"),
  ivr: text("ivr"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UnifiedNumber = typeof unifiedNumbers.$inferSelect;
export type InsertUnifiedNumber = typeof unifiedNumbers.$inferInsert;

// Broadcast Messages Table
export const broadcastMessages = mysqlTable("broadcastMessages", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  channel: mysqlEnum("channel", ["sms", "whatsapp", "email", "all"]).notNull(),
  recipientCount: int("recipientCount").default(0),
  sentCount: int("sentCount").default(0),
  failedCount: int("failedCount").default(0),
  scheduledTime: timestamp("scheduledTime"),
  sentTime: timestamp("sentTime"),
  status: mysqlEnum("status", ["draft", "scheduled", "sent", "failed"]).default("draft"),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BroadcastMessage = typeof broadcastMessages.$inferSelect;
export type InsertBroadcastMessage = typeof broadcastMessages.$inferInsert;

// Reports Table
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  reportType: mysqlEnum("reportType", ["calls", "messages", "team_performance", "customer_satisfaction", "revenue"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  data: text("data"),
  period: mysqlEnum("period", ["daily", "weekly", "monthly", "yearly", "custom"]).default("daily"),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

// Subscriptions Table
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  planName: varchar("planName", { length: 64 }).notNull(),
  planPrice: int("planPrice").notNull(),
  billingCycle: mysqlEnum("billingCycle", ["monthly", "yearly"]).default("monthly"),
  status: mysqlEnum("status", ["active", "inactive", "suspended", "cancelled"]).default("active"),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  nextBillingDate: timestamp("nextBillingDate"),
  cancellationDate: timestamp("cancellationDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;
