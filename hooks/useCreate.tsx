import { useMutation, useQueryClient } from "@tanstack/react-query";

const createData = async (api: string, body: any) => {
	try {
		const response = await fetch(`/api${api}`, { method: "POST", body: JSON.stringify(body) });
		const data = await response.json();

		if (!response.ok) throw new Error(data);
		return data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
};

export const useCreate = (api: string, queryKey: string[]) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: any) => createData(api, data),
		onSuccess: () => queryKey.map((key) => queryClient.invalidateQueries({ queryKey: [key] })),
	});

	return mutation;
};
