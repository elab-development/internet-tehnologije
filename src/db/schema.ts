import { integer, pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passHash: varchar("pass_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow()
});
