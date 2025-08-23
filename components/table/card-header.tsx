"use client";
import { Plus } from "lucide-react";

type TCardHeader = {
	onAdd: () => void;
};

export const CardHeader = ({ onAdd }: TCardHeader) => {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-2xl md:text-3xl font-bold mx-2 text-clip bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
				Debts Overview
			</h2>
			<button
				className="flex items-center ml-auto gap-1 px-4 py-2  text-white rounded-lg bg-gradient-to-b from-amber-500 font-semibold to-amber-700 transition cursor-pointer"
				onClick={onAdd}
				type="button">
				<Plus className="size-4 stroke-3" /> Add
			</button>
		</div>
	);
};
