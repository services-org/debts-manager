import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateData = async (api: string, body: any) => {
	try {
		if (!body._id) throw new Error("Missing Id");

		const response = await fetch(`/api${api}/${body._id}`, { method: "PUT", body: JSON.stringify(body) });
		const data = await response.json();

		if (!response.ok) throw new Error("Failed to update data");
		return data;
	} catch (error) {
		throw new Error("Failed to update data");
	}
};

export const useUpdate = (api: string, queryKey: string[]) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (body: any) => updateData(api, body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey }),
	});

	return mutation;
};
