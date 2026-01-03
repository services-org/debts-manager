type TAmountCell = {
    amount: number;
};

export const AmountCell = ({ amount }: TAmountCell) => {
    return (
        <span className="inline-flex items-center rounded-lg bg-linear-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-sm font-bold text-white shadow-sm">
            ${amount.toLocaleString()}
        </span>
    );
};

AmountCell.displayName = "AmountCell";
