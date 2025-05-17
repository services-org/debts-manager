import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDebts, addDebt, updateDebt, deleteDebt } from "@/lib/api-debts";
import { TDebtFormValues } from "@/components/debt-form";

export const useGetDebts = () =>
	useQuery({
		queryKey: ["debts"],
		queryFn: getDebts,
	});

export const useCreateDebt = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addDebt,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["debts"] }),
	});
};

export const useUpdateDebt = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ _id, ...data }: TDebtFormValues & { _id: string }) => updateDebt(_id, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["debts"] }),
	});
};

export const useDeleteDebt = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (_id: string) => deleteDebt(_id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["debts"] }),
	});
};
