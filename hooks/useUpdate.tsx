import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateData = async (api: string, body: any) => {
	try {
		if (!body._id) throw new Error("Missing Id");

		const response = await fetch(`/api${api}/${body._id}`, { method: "PUT", body: JSON.stringify(body) });
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
		onSuccess: () => queryClient.invalidateQueries({ queryKey }),
	});

	return mutation;
};
