import { eq } from "drizzle-orm";
import express, { type Request, type Response } from "express";

import { db } from "../db.js";
import { items } from "../schema.js";
import { createItemSchema, updateItemSchema } from "../types/item.types.js";

const router = express.Router();

router.get("/items", async (_req: Request, res: Response) => {
	res.json(await db.select().from(items));
});

router.get(
	"/items/:id",
	async (req: Request<{ id: string }>, res: Response) => {
		const [item] = await db
			.select()
			.from(items)
			.where(eq(items.id, req.params.id));
		if (!item) return res.status(404).json({ error: "Item not found" });
		res.json(item);
	},
);

router.post("/items", async (req: Request, res: Response) => {
	const result = createItemSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ error: result.error.issues });
	}

	const [item] = await db.insert(items).values(result.data).returning();
	res.status(201).json(item);
});

router.patch(
	"/items/:id",
	async (req: Request<{ id: string }>, res: Response) => {
		const result = updateItemSchema.safeParse(req.body);
		if (!result.success) {
			return res.status(400).json({ error: result.error.issues });
		}

		const [item] = await db
			.update(items)
			.set(result.data)
			.where(eq(items.id, req.params.id))
			.returning();
		if (!item) return res.status(404).json({ error: "Item not found" });
		res.json(item);
	},
);

router.delete(
	"/items/:id",
	async (req: Request<{ id: string }>, res: Response) => {
		const [item] = await db
			.delete(items)
			.where(eq(items.id, req.params.id))
			.returning();
		if (!item) return res.status(404).json({ error: "Item not found" });
		res.json(item);
	},
);

export default router;
