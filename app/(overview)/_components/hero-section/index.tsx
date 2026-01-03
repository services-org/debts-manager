"use client";
import { WalletIcon, TrendingUpIcon, SparklesIcon } from "lucide-react";

export const HeroSection = () => (
    <section className="animate-fade-in group relative mb-6 w-full overflow-hidden rounded-2xl bg-linear-to-br from-amber-50 to-amber-100 shadow-xl sm:mb-8 sm:rounded-3xl dark:from-slate-900 dark:to-slate-950">
        {/* Animated gradient orbs */}
        <div className="absolute -top-16 -left-16 size-48 rounded-full bg-amber-400/20 blur-3xl transition-all duration-1000 group-hover:scale-110 group-hover:bg-amber-400/30 sm:-top-24 sm:-left-24 sm:size-72 dark:bg-amber-500/20 dark:group-hover:bg-amber-500/30" />
        <div className="absolute -right-16 -bottom-16 size-48 rounded-full bg-orange-400/20 blur-3xl transition-all duration-1000 group-hover:scale-110 group-hover:bg-orange-400/30 sm:-right-24 sm:-bottom-24 sm:size-72 dark:bg-orange-500/20 dark:group-hover:bg-orange-500/30" />
        <div className="absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-3xl sm:size-48 dark:bg-yellow-500/10" />

        {/* Grid pattern overlay */}
        <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-5"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
            }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 p-5 sm:gap-8 sm:p-8 md:flex-row md:justify-between md:p-12">
            {/* Left content */}
            <div className="flex flex-1 flex-col items-center gap-3 text-center sm:gap-4 md:items-start md:text-left">
                {/* Badge */}
                <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 backdrop-blur-sm sm:px-4 sm:py-1.5 dark:border-amber-500/30 dark:bg-amber-500/10">
                    <SparklesIcon className="size-3 text-amber-600 sm:size-4 dark:text-amber-400" />
                    <span className="text-[10px] font-semibold tracking-wide text-amber-700 sm:text-xs dark:text-amber-400">
                        SMART TRACKING
                    </span>
                </div>

                {/* Main heading */}
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
                    <span className="block">Take Control of Your</span>
                    <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                        Financial Future
                    </span>
                </h1>

                {/* Description */}
                <p className="max-w-lg text-sm text-slate-600 sm:text-base dark:text-slate-400">
                    Visualize, track, and conquer your debts with intelligent insights.
                </p>

                {/* Stats row */}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 sm:mt-4 sm:gap-6 md:justify-start">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-green-100 sm:size-10 sm:rounded-xl dark:bg-green-500/20">
                            <TrendingUpIcon className="size-4 text-green-600 sm:size-5 dark:text-green-400" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-500">Track Progress</p>
                            <p className="text-xs font-semibold text-slate-800 sm:text-sm dark:text-white">Real-time</p>
                        </div>
                    </div>
                    <div className="h-6 w-px bg-slate-300 sm:h-8 dark:bg-slate-700" />
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-amber-100 sm:size-10 sm:rounded-xl dark:bg-amber-500/20">
                            <WalletIcon className="size-4 text-amber-600 sm:size-5 dark:text-amber-400" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-500">Manage</p>
                            <p className="text-xs font-semibold text-slate-800 sm:text-sm dark:text-white">All Debts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Decorative element (hidden on small mobile) */}
            <div className="xs:flex relative hidden items-center justify-center sm:flex">
                {/* Glowing rings */}
                <div className="absolute size-32 animate-pulse rounded-full border border-amber-400/20 sm:size-40 md:size-48 dark:border-amber-500/20" />
                <div className="absolute size-24 rounded-full border border-amber-400/30 sm:size-32 md:size-40 dark:border-amber-500/30" />
                <div className="absolute size-16 rounded-full border border-amber-400/40 sm:size-24 md:size-32 dark:border-amber-500/40" />

                {/* Central icon */}
                <div className="relative flex size-14 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 sm:size-20 md:size-24">
                    <WalletIcon className="size-7 text-white sm:size-10 md:size-12" />
                </div>
            </div>
        </div>
    </section>
);

HeroSection.displayName = "HeroSection";
