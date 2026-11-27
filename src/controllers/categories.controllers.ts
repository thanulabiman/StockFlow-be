import { eq } from "drizzle-orm";
import express, { type Request, type Response } from "express";

import { db } from "../db.js";
import { categories } from "../schema.js";
import { createCategorySchema } from "../types/category.types.js";

const router = express.Router();

router.get("/categories", async (_req: Request, res: Response) => {
	res.json(await db.select().from(categories));
});

router.get(
	"/categories/:id",
	async (req: Request<{ id: string }>, res: Response) => {
		const [category] = await db
			.select()
			.from(categories)
			.where(eq(categories.id, req.params.id));
		if (!category) return res.status(404).json({ error: "Category not found" });
		res.json(category);
	},
);

router.post("/categories", async (req: Request, res: Response) => {
	const result = createCategorySchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ error: result.error.issues });
	}

	const [category] = await db
		.insert(categories)
		.values(result.data)
		.returning();
	res.status(201).json(category);
});

router.delete(
	"/categories/:id",
	async (req: Request<{ id: string }>, res: Response) => {
		const [category] = await db
			.delete(categories)
			.where(eq(categories.id, req.params.id))
			.returning();
		if (!category) return res.status(404).json({ error: "Category not found" });
		res.json(category);
	},
);

export default router;
