import { Geist, Geist_Mono } from "next/font/google";
import { TanstackProvider } from "@/lib/tanstack";
import Image from "next/image";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

type TLayout = {
	children: React.ReactNode;
};

const Layout = ({ children }: TLayout) => {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
				{/* Global background image */}
				<Image
					src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
					alt="Finance background"
					className="fixed inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none z-0"
				/>

				{/* Overlay for readability and partial image reveal */}
				<div className="fixed inset-0 bg-white/90 z-10 pointer-events-none" />

				{/* Gradient mask at the bottom for partial image reveal */}
				<div
					className="fixed inset-0 z-20 pointer-events-none"
					style={{ maskImage: "linear-gradient(to top, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 40%, transparent 100%)" }}
				/>

				<div className="relative z-30">
					<TanstackProvider>{children}</TanstackProvider>
				</div>
			</body>
		</html>
	);
};

export default Layout;
