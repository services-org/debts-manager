"use client";
import { FormProvider, useForm } from "react-hook-form";
import { SearchIcon } from "lucide-react";

import { ListItems } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResultItem } from "./result-item";
import { useCreate } from "@/hooks";

export const SearchBar = () => {
    const searchDebt = useCreate("/debts/search", ["search"]);
    const form = useForm();

    const onSubmit = (data: any) => {
        searchDebt.mutate(data);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-3 sm:mt-8">
                <h2 className="text-lg font-semibold text-slate-800 sm:text-xl dark:text-slate-200">Search</h2>
                <div className="flex items-center gap-2">
                    <Input
                        className="flex-1 rounded-lg border-slate-300 bg-white text-sm placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
                        placeholder="Search debts..."
                        name="search"
                        type="search"
                    />
                    <Button
                        size="icon"
                        className="shrink-0 bg-linear-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                    >
                        <SearchIcon className="size-4" />
                    </Button>
                </div>

                <div className="space-y-2">
                    <ListItems items={searchDebt.data} Item={ResultItem} />
                </div>
            </form>
        </FormProvider>
    );
};

SearchBar.displayName = "SearchBar";
