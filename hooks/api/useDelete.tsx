import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteData = async (api: string) => {
	try {
		const response = await fetch(`/api${api}`, { method: "DELETE" });
		const data = await response.json();

		if (!response.ok) throw new Error(data);
		return data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
};

export const useDelete = (api: string, queryKey: string[]) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => deleteData(api),
		onSuccess: () => queryKey.map((key) => queryClient.invalidateQueries({ queryKey: [key] })),
	});

	return mutation;
};
