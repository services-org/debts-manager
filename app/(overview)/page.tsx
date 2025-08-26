"use client";
import { AnalysisSection } from "./_components/analysis-section";
import { TableSection } from "./_components/table-section";
import { HeroSection } from "./_components/hero-section";
import { SearchBar } from "./_components/search-bar";

const Home = () => {
    return (
        <main className="container mx-auto min-h-screen space-y-6 p-4 sm:p-8">
            <HeroSection />
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:order-2 md:col-span-4">
                    <AnalysisSection />
                    <SearchBar />
                </div>
                <div className="col-span-12 md:order-1 md:col-span-8">
                    <TableSection />
                </div>
            </div>
        </main>
    );
};

export default Home;
