import { useQuery } from "@tanstack/react-query";

const getData = async (api: string) => {
	try {
		const response = await fetch(`/api${api}`, { method: "GET" });
		if (!response.ok) throw new Error("Failed to fetch data");
		return response.json();
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

export const useGet = (api: string, queryKey: string[]) => {
	const query = useQuery({ queryKey, queryFn: () => getData(api) });
	return query;
};
