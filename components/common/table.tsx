import { Table as ShTable, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";

type TTable = {
    data: Record<string, any>[];
    caption?: string;
};

export const Table = ({ caption, data }: TTable) => {
    if (!Array.isArray(data)) return;
    const headers = Object.keys(data[0] ?? {}).filter((key) => key !== "_id");

    return (
        <ShTable className="min-w-full border-separate border-spacing-y-4 bg-transparent">
            <TableCaption>{caption}</TableCaption>

            <TableHeader>
                <TableRow className="rounded-t-xl bg-gradient-to-b from-amber-500 to-amber-700 text-base text-white capitalize shadow">
                    {headers?.map((header, index) => (
                        <TableHead key={header} className={cn("px-2 font-bold text-white", index && "text-center")}>
                            {header.replaceAll(/[A-Z]/g, " $&")}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data?.map((item, index) => (
                    <TableRow key={item._id} tabIndex={index} className="my-4 rounded-2xl bg-white shadow-md transition-all">
                        {headers.map((header, index) => (
                            <TableCell
                                key={index}
                                className={cn("p-4 align-middle text-base font-medium text-gray-900", index && "text-center")}
                            >
                                {header === "createdAt" ? new Date(item[header]).toLocaleDateString() : item[header]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}

                {!data.length &&
                    Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <tr key={`key-${index}`}>
                                <td colSpan={5} className="py-1 text-gray-500">
                                    <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
                                </td>
                            </tr>
                        ))}
            </TableBody>
        </ShTable>
    );
};

Table.displayName = "Table";
