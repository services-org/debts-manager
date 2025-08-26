import { BrainIcon, Wallet } from "lucide-react";
import { SVGBackground } from "./svg-background";

export const HeroSection = () => (
    <section className="animate-fade-in relative mb-8 w-full overflow-hidden rounded-3xl shadow-xl">
        <SVGBackground />

        <div className="relative z-10 flex flex-col items-center gap-6 p-8 md:flex-row md:p-12">
            <div className="flex flex-1 flex-col items-start">
                <span className="mb-3 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-1 text-xs font-semibold text-black shadow">
                    NEW FEATURE
                </span>
                <span className="mb-4 inline-flex items-center justify-center rounded-full bg-white/60 p-4 shadow-lg backdrop-blur-md">
                    <Wallet size={40} className="text-amber-700 drop-shadow-lg" />
                </span>
                <h1 className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-3xl font-extrabold tracking-tight text-clip text-transparent md:text-5xl md:leading-20">
                    Smart Debt Tracking
                </h1>
                <p className="mb-4 max-w-lg text-sm text-slate-500 md:text-base">
                    Save more, stress less. Visualize and manage your debts with ease.
                </p>
            </div>
            <div className="flex flex-1 justify-center md:justify-end">
                <BrainIcon className="size-24 text-amber-700 drop-shadow-lg" />
            </div>
        </div>
    </section>
);

HeroSection.displayName = "HeroSection";
