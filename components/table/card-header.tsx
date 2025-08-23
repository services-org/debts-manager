"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Plus, SearchIcon } from "lucide-react";

import { useCreate } from "@/hooks";
import { Input } from "../ui/input";

type TCardHeader = {
	onAdd: () => void;
};

export const CardHeader = ({ onAdd }: TCardHeader) => {
	const form = useForm();

	const search = form.watch("search");
	const searchDebt = useCreate("/debts/search", ["search", search]);

	const onSubmit = (data: any) => {
		searchDebt.mutate(data);
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
				onSubmit={form.handleSubmit(onSubmit)}>
				<h2 className="text-2xl font-bold text-clip bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
					Debts Overview
				</h2>

				<div className="space-y-2 w-full sm:w-full sm:max-w-md">
					<button
						className="flex items-center ml-auto gap-1 px-4 py-2  text-white rounded-lg bg-gradient-to-b from-amber-500 font-semibold to-amber-700 transition cursor-pointer"
						onClick={onAdd}
						type="button">
						<Plus className="size-4 stroke-3" /> Add
					</button>

					<div className="space-y-2">
						<div className="flex items-center group gap-2 ">
							<Input
								className="rounded-md border-2 border-slate-200"
								placeholder="Search For..."
								name="search"
								type="search"
							/>
							<button
								className="flex items-center ml-auto gap-1 px-4 py-2 bg-amber-200/50 text-black rounded-lg transition cursor-pointer"
								type="submit">
								<SearchIcon className="size-6 " />
							</button>
						</div>

						{!!searchDebt.data?.length &&
							searchDebt.data.map((result: any) => (
								<div
									className="text-white px-4 py-2 rounded-md bg-gradient-to-b from-amber-500 to-amber-700 flex items-center justify-between font-semibold"
									key={result.description}>
									<p>{result.description}</p> : <p>{result.count} PCS</p> : <p>{result.amount} $</p>
								</div>
							))}
					</div>
				</div>
			</form>
		</FormProvider>
	);
};
