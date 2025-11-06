import { CalendarIcon, CheckCircleIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { debtSchema, TDebtSchema } from "@/app/api/debts/schema";
import { useCreate, useModel } from "@/hooks";

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

const defaultValues = { status: "unpaid" as const, group: "civil" as const, createdAt: new Date().toISOString().split("T")[0] };
export const AddDebtModel = () => {
    const form = useForm<TDebtSchema>({ resolver: zodResolver(debtSchema), defaultValues });
    const createDebt = useCreate("/debts", ["debts", "analysis"]);

    const { open, type, onClose } = useModel();
    if (!open || type !== "add-debt") return;

    const onSubmit = (data: TDebtSchema) => {
        createDebt.mutate(data, {
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    };

    return (
        <Model modelType="add-debt" title="Add Debt" description="Add a new debt to the overview">
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

AddDebtModel.displayName = "AddDebtModel";
