import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteData = async (api: string, id?: string) => {
    try {
        const url = id ? `/api${api}?_id=${id}` : `/api${api}`;
        const response = await fetch(url, { method: "DELETE" });
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
        mutationFn: (id?: string) => deleteData(api, id),
        onSuccess: () => queryKey.map((key) => queryClient.invalidateQueries({ queryKey: [key] })),
    });

    return mutation;
};
