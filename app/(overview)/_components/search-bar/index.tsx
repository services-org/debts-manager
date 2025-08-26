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
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto my-2 max-w-md space-y-2">
                <div className="group flex items-center gap-2">
                    <Input
                        className="rounded-md border-2 border-slate-200"
                        placeholder="Search For..."
                        name="search"
                        type="search"
                    />
                    <Button size="icon" variant="outline" className="border-amber-500 bg-amber-50 hover:bg-amber-100">
                        <SearchIcon className="size-5" />
                    </Button>
                </div>

                <ListItems items={searchDebt.data} Item={ResultItem} />
            </form>
        </FormProvider>
    );
};

SearchBar.displayName = "SearchBar";
