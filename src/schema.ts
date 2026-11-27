import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const items = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
  quantityOnHand: integer("quantity_on_hand").notNull().default(0),
  reorderLevel: integer("reorder_level").notNull().default(0),
});

export type Item = typeof items.$inferSelect; // a row you read
export type NewItem = typeof items.$inferInsert; // a row you insert
