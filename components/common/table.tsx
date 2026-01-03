import { Table as ShTable, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TTable = {
    data: Record<string, any>[];
    caption?: string;
    isLoading?: boolean;
};

export const Table = ({ caption, data, isLoading }: TTable) => {
    if (!Array.isArray(data)) return null;
    const headers = Object.keys(data[0] ?? {}).filter((key) => key !== "_id");
    const showEmptyState = !isLoading && data.length === 0;
    const showSkeleton = isLoading && data.length === 0;

    // Default headers when no data
    const displayHeaders = headers.length > 0 ? headers : ["description", "group", "status", "amount", "createdAt", "actions"];

    return (
        <ShTable className="min-w-full border-separate border-spacing-y-3 bg-transparent sm:border-spacing-y-4">
            <TableCaption>{caption}</TableCaption>

            <TableHeader>
                <TableRow className="rounded-t-xl bg-linear-to-r from-amber-500 to-orange-500 text-sm text-white capitalize shadow sm:text-base">
                    {displayHeaders?.map((header, index) => (
                        <TableHead
                            key={header}
                            className={cn("px-2 py-2 font-bold text-white sm:px-3 sm:py-3", index && "text-center")}
                        >
                            {header.replaceAll(/[A-Z]/g, " $&")}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data?.map((item, index) => (
                    <TableRow
                        key={item._id}
                        tabIndex={index}
                        className="my-3 rounded-xl bg-white shadow-sm transition-all hover:shadow-md sm:my-4 sm:rounded-2xl dark:bg-slate-700/50"
                    >
                        {headers.map((header, index) => (
                            <TableCell
                                key={index}
                                className={cn(
                                    "p-3 align-middle text-sm font-medium text-slate-800 sm:p-4 sm:text-base dark:text-slate-200",
                                    index && "text-center",
                                )}
                            >
                                {header === "createdAt" ? new Date(item[header]).toLocaleDateString() : item[header]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}

                {/* Show skeleton only while loading */}
                {showSkeleton &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <tr key={`skeleton-${index}`}>
                            <td colSpan={displayHeaders.length} className="py-1">
                                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 sm:h-14 dark:bg-slate-600" />
                            </td>
                        </tr>
                    ))}

                {/* Show empty state when no data and not loading */}
                {showEmptyState && (
                    <tr>
                        <td colSpan={displayHeaders.length} className="py-8 text-center">
                            <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
                                <InboxIcon className="size-10 sm:size-12" />
                                <p className="text-sm sm:text-base">No debts found</p>
                                <p className="text-xs text-slate-400 dark:text-slate-600">Add a debt to get started</p>
                            </div>
                        </td>
                    </tr>
                )}
            </TableBody>
        </ShTable>
    );
};

Table.displayName = "Table";
