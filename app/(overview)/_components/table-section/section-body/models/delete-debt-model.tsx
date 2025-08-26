import { Model } from "@/components/common/model";
import { Button } from "@/components/ui/button";
import { useDelete, useModel } from "@/hooks";

export const DeleteDebtModel = () => {
    const { open, type, data, onClose } = useModel();
    const deleteDebt = useDelete(`/debts?_id=${data?.debtId}`, ["debts", "analysis"]);

    if (!open || type !== "delete-debt" || !data?.debtId) return;

    const onDelete = () => {
        deleteDebt.mutate();
        onClose();
    };

    return (
        <Model modelType="delete-debt" title="Delete Debt" description="Are you sure you want to delete this debt?">
            <div className="flex w-full justify-end">
                <Button variant="ghost">Cancel</Button>
                <Button variant="destructive" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </Model>
    );
};

DeleteDebtModel.displayName = "DeleteDebtModel";
