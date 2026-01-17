import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Calls queries
export async function getCallsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  const { calls } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(calls).where(eq(calls.companyId, companyId)).limit(100);
}

export async function createCall(callData: any) {
  const db = await getDb();
  if (!db) return null;
  const { calls } = await import("../drizzle/schema");
  const result = await db.insert(calls).values(callData);
  return result;
}

// Messages queries
export async function getMessagesByConversation(conversationId: number) {
  const db = await getDb();
  if (!db) return [];
  const { messages } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(messages).where(eq(messages.conversationId, conversationId));
}

export async function createMessage(messageData: any) {
  const db = await getDb();
  if (!db) return null;
  const { messages } = await import("../drizzle/schema");
  return db.insert(messages).values(messageData);
}

// Conversations queries
export async function getConversationsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  const { conversations } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(conversations).where(eq(conversations.companyId, companyId));
}

export async function createConversation(conversationData: any) {
  const db = await getDb();
  if (!db) return null;
  const { conversations } = await import("../drizzle/schema");
  return db.insert(conversations).values(conversationData);
}

// Unified Numbers queries
export async function getNumbersByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  const { unifiedNumbers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(unifiedNumbers).where(eq(unifiedNumbers.companyId, companyId));
}

export async function createUnifiedNumber(numberData: any) {
  const db = await getDb();
  if (!db) return null;
  const { unifiedNumbers } = await import("../drizzle/schema");
  return db.insert(unifiedNumbers).values(numberData);
}

// Reports queries
export async function getReportsByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return [];
  const { reports } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(reports).where(eq(reports.companyId, companyId));
}

export async function createReport(reportData: any) {
  const db = await getDb();
  if (!db) return null;
  const { reports } = await import("../drizzle/schema");
  return db.insert(reports).values(reportData);
}

// Subscriptions queries
export async function getSubscriptionByCompany(companyId: number) {
  const db = await getDb();
  if (!db) return null;
  const { subscriptions } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const result = await db.select().from(subscriptions).where(eq(subscriptions.companyId, companyId)).limit(1);
  return result[0] || null;
}

export async function createSubscription(subscriptionData: any) {
  const db = await getDb();
  if (!db) return null;
  const { subscriptions } = await import("../drizzle/schema");
  return db.insert(subscriptions).values(subscriptionData);
}

// Companies queries
export async function getCompanyById(companyId: number) {
  const db = await getDb();
  if (!db) return null;
  const { companies } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const result = await db.select().from(companies).where(eq(companies.id, companyId)).limit(1);
  return result[0] || null;
}

export async function createCompany(companyData: any) {
  const db = await getDb();
  if (!db) return null;
  const { companies } = await import("../drizzle/schema");
  return db.insert(companies).values(companyData);
}
