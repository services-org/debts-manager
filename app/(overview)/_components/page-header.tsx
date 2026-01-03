"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const PageHeader = () => {
    const [isDark, setIsDark] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        // Check initial theme
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        document.documentElement.classList.toggle("dark", newIsDark);
        localStorage.setItem("theme", newIsDark ? "dark" : "light");
    };

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md transition-colors sm:px-6 md:px-8 dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Debts Manager Logo" width={32} height={32} className="size-6" />
                <h1 className="bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                    {user?.fullName ?? "Debts Manager"}
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="size-9 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                    {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
                </Button>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-8 h-8 sm:w-9 sm:h-9",
                        },
                    }}
                />
            </div>
        </header>
    );
};

PageHeader.displayName = "PageHeader";
