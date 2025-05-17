import { useMutation, useQueryClient } from "@tanstack/react-query";


const deleteData = async (api: string, body: any) => {
	try {
		if (!body._id) throw new Error("Missing Id");

		const response = await fetch(`/api${api}/${body._id}`, { method: "DELETE" });
		const data = await response.json();

		if (!response.ok) throw new Error("Failed to delete data");
		return data;
	} catch (error) {
		throw new Error("Failed to delete data");
	}
};

export const useDelete = (api: string, queryKey: string[]) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (body: any) => deleteData(api, body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey }),
	});

	return mutation;
};
