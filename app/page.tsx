"use client";
import { HeroSection } from "@/components/common/hero-section";
import { SummaryCards } from "@/components/summary-cards";
import { SearchBar } from "@/components/table/search-bar";
import { DebtTable } from "@/components/table";

const Home = () => {
	return (
		<main className="container mx-auto space-y-6 min-h-screen p-4 sm:p-8">
			<HeroSection />
			<div className="grid grid-cols-12 gap-8">
				<div className="col-span-12 md:col-span-4 md:order-2">
					<SummaryCards />
					<SearchBar />
				</div>
				<div className="col-span-12 md:col-span-8 md:order-1">
					<DebtTable />
				</div>
			</div>
		</main>
	);
};

export default Home;
