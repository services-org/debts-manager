import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateData = async (api: string, body: any) => {
	try {
		const response = await fetch(`/api${api}`, { method: "PUT", body: JSON.stringify(body) });
		const data = await response.json();

		if (!response.ok) throw new Error(data);
		return data;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const useUpdate = (api: string, queryKey: string[]) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (body: any) => updateData(api, body),
		onSuccess: () => queryKey.map((key) => queryClient.invalidateQueries({ queryKey: [key] })),
	});

	return mutation;
};
