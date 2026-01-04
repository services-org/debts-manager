import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { TanstackProvider } from "@/lib/tanstack";
import { I18nProvider } from "@/lib/i18n";
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
        <ClerkProvider>
            <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
                <body className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen antialiased`}>
                    <I18nProvider>
                        <TanstackProvider>{children}</TanstackProvider>
                    </I18nProvider>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default Layout;
