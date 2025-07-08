"use client";
import { SummaryCards } from "@/components/summary-cards";
import { HeroSection } from "@/components/hero-section";
import { DebtTable } from "@/components/table";

const Home = () => {
	return (
		<main className="container mx-auto flex flex-col gap-10 min-h-screen p-4 sm:p-8">
			<HeroSection />
			<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
				<DebtTable />
				<SummaryCards />
			</div>
		</main>
	);
};

export default Home;
