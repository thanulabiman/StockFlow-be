import { z } from "zod";

// No .default() here: the database fills in quantity_on_hand and
// reorder_level (DEFAULT 0), and .partial() keeps PATCH from resetting them.
export const createItemSchema = z.object({
	sku: z.string().trim().min(1),
	name: z.string().trim().min(1),
	categoryId: z.uuid(),
	quantityOnHand: z.int().nonnegative().optional(),
	reorderLevel: z.int().nonnegative().optional(),
});

export const updateItemSchema = createItemSchema.partial();
