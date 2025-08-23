import { FormProvider, useForm } from "react-hook-form";
import { SearchIcon } from "lucide-react";

import { useCreate } from "@/hooks";
import { Input } from "../ui/input";

export const SearchBar = () => {
	const searchDebt = useCreate("/debts/search", ["search"]);
	const form = useForm();

	const onSubmit = (data: any) => {
		searchDebt.mutate(data);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 my-2 max-w-md mx-auto">
				<div className="group flex items-center gap-2">
					<Input
						className="rounded-md border-2 border-slate-200"
						placeholder="Search For..."
						name="search"
						type="search"
					/>
					<button
						className="flex items-center ml-auto gap-1 px-4 py-2 bg-amber-200/50 text-black rounded-lg transition cursor-pointer"
						type="submit">
						<SearchIcon className="size-6" />
					</button>
				</div>

				{searchDebt.data?.map((result: any) => (
					<div
						className="flex items-center justify-between font-semibold text-white px-4 py-2 rounded-md bg-gradient-to-b from-amber-500 to-amber-700"
						key={result.description}>
						<p>{result.description}</p> : <p>{result.count} PCS</p> : <p>{result.amount} $</p>
					</div>
				))}
			</form>
		</FormProvider>
	);
};

SearchBar.displayName = "SearchBar";
