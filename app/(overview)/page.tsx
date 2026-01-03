"use client";
import { useEffect } from "react";

import { AnalysisSection } from "./_components/analysis-section";
import { TableSection } from "./_components/table-section";
import { HeroSection } from "./_components/hero-section";
import { PageHeader } from "./_components/page-header";
import { SearchBar } from "./_components/search-bar";

const Home = () => {
    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-900">
            <PageHeader />
            <main className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
                <HeroSection />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                    {/* Main content - Table */}
                    <div className="lg:col-span-8">
                        <TableSection />
                    </div>

                    {/* Sidebar - Analytics & Search */}
                    <div className="space-y-6 lg:col-span-4">
                        <AnalysisSection />
                        <SearchBar />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
