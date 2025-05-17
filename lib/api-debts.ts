import { TDebtFormValues } from "@/components/table/form";

const BASE_URL = "http://localhost:3000/api/debts";

export const getDebts = async () => {
	const res = await fetch(BASE_URL);
	if (!res.ok) throw new Error("Failed to fetch debts");
	return res.json();
};

export const addDebt = async (data: TDebtFormValues) => {
	const res = await fetch(BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Failed to add debt");
	return res.json();
};

export const updateDebt = async (_id: string, data: TDebtFormValues) => {
	const res = await fetch(`${BASE_URL}/${_id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Failed to update debt");
	return res.json();
};

export const deleteDebt = async (_id: string) => {
	const res = await fetch(`${BASE_URL}/${_id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("Failed to delete debt");
	return res.json();
};
