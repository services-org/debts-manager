"use client";
import * as React from "react";
import { DebtTable } from "@/components/debt-table";
import { SummaryCards } from "@/components/summary-cards";
import { useGetDebts } from "@/lib/hooks/use-debts";

const Home = () => {
	const { data: debts = [] } = useGetDebts();

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 gap-8">
			<h1 className="text-3xl font-bold mb-4">Debts Manager</h1>
			<SummaryCards debts={debts} />
			<section className="w-full max-w-4xl">
				<DebtTable />
			</section>
		</main>
	);
};

export default Home;
