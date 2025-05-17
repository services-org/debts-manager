import { BrainIcon, Wallet } from "lucide-react";

type THeroSection = {
	title?: string;
	subtitle?: string;
};

export const HeroSection = ({ title = "Smart Debt Tracking", subtitle = "Save more, stress less. Visualize and manage your debts with ease." }: THeroSection) => (
	<section className="relative w-full rounded-3xl overflow-hidden shadow-xl mb-8 animate-fade-in">
		{/* Curved SVG background */}
		<svg className="absolute top-0 left-0 w-full h-40 md:h-56 z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="url(#heroGradient)"
				fillOpacity="1"
				d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
			/>
			<defs>
				<linearGradient id="heroGradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
					<stop stopColor="#22d3ee" />
					<stop offset="0.5" stopColor="#4ade80" />
					<stop offset="1" stopColor="#fde047" />
				</linearGradient>
			</defs>
		</svg>

		<div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-8 md:p-12">
			<div className="flex-1 flex flex-col items-start">
				<span className="mb-3 px-3 py-1 rounded-full bg-yellow-200/80 text-yellow-900 text-xs font-semibold shadow">NEW FEATURE</span>
				<span className="inline-flex items-center justify-center rounded-full bg-white/60 p-4 shadow-lg backdrop-blur-md mb-4">
					<Wallet size={40} className="text-cyan-700 drop-shadow-lg" />
				</span>
				<h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">{title}</h1>
				<p className="text-base md:text-xl text-cyan-800 mb-4 max-w-lg">{subtitle}</p>
			</div>
			<div className="flex-1 flex justify-center md:justify-end">
				<BrainIcon size={120} className="text-cyan-700 drop-shadow-lg" />
			</div>
		</div>
	</section>
);
