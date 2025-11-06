import { CalendarIcon, CheckCircleIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Image from "next/image";

import { debtSchema, TDebtSchema } from "@/app/api/debts/schema";
import { useUpdate, useModel } from "@/hooks";

import { Model } from "@/components/common/model";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const statusOptions = [
    { value: "unpaid", label: "Unpaid" },
    { value: "paid", label: "Paid" },
];

const groupOptions = [
    { value: "personal", label: "Personal" },
    { value: "civil", label: "Civil" },
];

export const UpdateDebtModel = () => {
    const form = useForm<TDebtSchema>({ resolver: zodResolver(debtSchema) });
    const updateDebt = useUpdate(`/debts`, ["debts", "analysis"]);

    const { open, type, data, onClose } = useModel();

    useEffect(() => {
        if (!data?.debt) return;
        form.setValue("createdAt", new Date(data.debt.createdAt).toISOString().split("T")[0]);
        form.setValue("description", data.debt.description);
        form.setValue("amount", data.debt.amount);
        form.setValue("status", data.debt.status);
        form.setValue("group", data.debt.group);
    }, [data?.debt]);

    const onSubmit = (values: TDebtSchema) => {
        updateDebt.mutate({ _id: data?.debt?._id, ...values }, { onSuccess: onClose });
    };

    if (!open || !data?.debt || type !== "update-debt") return;

    return (
        <Model modelType="update-debt" title="Update Debt" description="Update an existing debt to the overview">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                    <Image fill src="/debts.jpg" alt="Debtor" className="absolute inset-0 z-0 object-cover opacity-10" />

                    <div className="relative">
                        <div className="space-y-6">
                            <Select
                                icon={<CheckCircleIcon className="size-4 text-purple-500" />}
                                options={groupOptions}
                                name="group"
                                label="Group"
                            />

                            <Input
                                icon={<FileTextIcon className="size-4 text-red-500" />}
                                name="description"
                                label="Description"
                            />

                            <Input
                                icon={<DollarSignIcon className="size-4 text-blue-500" />}
                                name="amount"
                                label="Amount"
                                type="number"
                            />

                            <Input
                                icon={<CalendarIcon className="size-4 text-cyan-500" />}
                                name="createdAt"
                                label="Created At"
                                type="date"
                            />

                            <Select
                                icon={<CheckCircleIcon className="size-4 text-green-500" />}
                                options={statusOptions}
                                name="status"
                                label="Status"
                            />
                        </div>

                        <div className="mt-4 ml-auto w-fit space-x-4">
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-amber-600 hover:bg-amber-500">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Model>
    );
};

UpdateDebtModel.displayName = "UpdateDebtModel";
