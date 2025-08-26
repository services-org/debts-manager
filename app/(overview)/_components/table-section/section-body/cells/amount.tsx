type TAmountCell = {
    amount: number;
};

export const AmountCell = ({ amount }: TAmountCell) => {
    return (
        <span className="rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-3 py-1 text-base font-bold text-white shadow">
            ${amount.toLocaleString()}
        </span>
    );
};

AmountCell.displayName = "AmountCell";
