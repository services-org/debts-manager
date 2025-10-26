type TResultItem = {
    description: string;
    amount: number;
    count: number;
};

export const ResultItem = ({ description, count, amount }: TResultItem) => {
    return (
        <div className="flex items-center justify-between rounded-md bg-linear-to-b from-amber-500 to-amber-700 px-4 py-2 font-semibold text-white">
            <p>{description}</p>
            <div className="flex justify-end gap-2">
                : <p>{count} PCS</p> : <p>{amount} $</p>
            </div>
        </div>
    );
};

ResultItem.displayName = "ResultItem";
