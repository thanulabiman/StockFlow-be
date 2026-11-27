import type { Category, Item } from "./types/item.types.js";

// In-memory "database". Everything resets when the server restarts.
export const categories: Category[] = [
	{ id: "cat-1", name: "Groceries" },
	{ id: "cat-2", name: "Beverages" },
	{ id: "cat-3", name: "Household" },
];

export const items: Item[] = [
	{
		id: "item-1",
		sku: "RIC-5K-001",
		name: "Premium Rice 5kg",
		categoryId: "cat-1",
		quantityOnHand: 1200,
		reorderLevel: 300,
	},
	{
		id: "item-2",
		sku: "OIL-1L-002",
		name: "Cooking Oil 1L",
		categoryId: "cat-1",
		quantityOnHand: 860,
		reorderLevel: 200,
	},
	{
		id: "item-3",
		sku: "MLK-400-003",
		name: "Milk Powder 400g",
		categoryId: "cat-1",
		quantityOnHand: 540,
		reorderLevel: 600,
	},
	{
		id: "item-4",
		sku: "TEA-200-004",
		name: "Black Tea 200g",
		categoryId: "cat-2",
		quantityOnHand: 420,
		reorderLevel: 150,
	},
	{
		id: "item-5",
		sku: "SOP-BAR-005",
		name: "Laundry Soap Bar",
		categoryId: "cat-3",
		quantityOnHand: 980,
		reorderLevel: 250,
	},
	{
		id: "item-6",
		sku: "WTR-15L-006",
		name: "Bottled Water 1.5L",
		categoryId: "cat-2",
		quantityOnHand: 1500,
		reorderLevel: 400,
	},
];