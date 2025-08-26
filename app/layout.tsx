import { Geist, Geist_Mono } from "next/font/google";
import { TanstackProvider } from "@/lib/tanstack";
import "@/public/styles.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
    title: "Debts",
    description: "Debts",
};

type TLayout = {
    children: React.ReactNode;
};

const Layout = ({ children }: TLayout) => {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen antialiased`}>
                <TanstackProvider>{children}</TanstackProvider>
            </body>
        </html>
    );
};

export default Layout;
