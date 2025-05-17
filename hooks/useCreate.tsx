import { useMutation, useQueryClient } from "@tanstack/react-query";

const createData = async (api: string, data: any) => {
	try {
		const response = await fetch(`/api${api}`, { method: "POST", body: JSON.stringify(data) });
		if (!response.ok) throw new Error("Failed to create data");
		return response.json();
	} catch (error) {
		throw new Error("Failed to create data");
	}
};

export const useCreate = (api: string, queryKey: string[]) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: any) => createData(api, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey }),
	});

	return mutation;
};
