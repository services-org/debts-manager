import { useQuery } from "@tanstack/react-query";

const getData = async (api: string) => {
	try {
		const response = await fetch(`/api${api}`, { method: "GET" });
		const data = await response.json();

		if (!response.ok) throw new Error(data);
		return data;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const useGet = (api: string, queryKey: string[]) => {
	const query = useQuery({ queryKey, queryFn: () => getData(api) });
	return query;
};
