import { integer, pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

// Predmeti
export const subjects = pgTable("subjects", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 150 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

// Špilovi
export const decks = pgTable("decks", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 150 }).notNull(),
    subjectId: uuid("subject_id").references(() => subjects.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passHash: varchar("pass_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow()
});
