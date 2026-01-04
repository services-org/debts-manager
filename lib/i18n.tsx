"use client";
import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react";

import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

type TLocale = "en" | "ar";
type TTranslations = typeof en;

type TI18nContext = {
    locale: TLocale;
    setLocale: (locale: TLocale) => void;
    t: (key: string) => string;
};

const translations: Record<TLocale, TTranslations> = { en, ar };

// Default translation function for before mount
const defaultT = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations.en;
    for (const k of keys) {
        value = value?.[k];
    }
    return typeof value === "string" ? value : key;
};

const I18nContext = createContext<TI18nContext>({
    locale: "ar",
    setLocale: () => {},
    t: defaultT,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocaleState] = useState<TLocale>("ar");
    const [isMounted, setIsMounted] = useState(false);

    // Load locale from localStorage on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem("locale") as TLocale;
        if (savedLocale && (savedLocale === "en" || savedLocale === "ar")) {
            setLocaleState(savedLocale);
        }
        setIsMounted(true);
    }, []);

    // Update HTML attributes when locale changes
    useEffect(() => {
        if (!isMounted) return;
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }, [locale, isMounted]);

    const setLocale = useCallback((newLocale: TLocale) => {
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);
    }, []);

    const t = useCallback(
        (key: string): string => {
            const keys = key.split(".");
            let value: any = translations[locale];

            for (const k of keys) {
                value = value?.[k];
            }

            return typeof value === "string" ? value : key;
        },
        [locale],
    );

    const contextValue = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

    return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
    return useContext(I18nContext);
};
