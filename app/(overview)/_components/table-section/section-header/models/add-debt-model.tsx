"use client";
import { CalendarIcon, CheckCircleIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { debtSchema, TDebtSchema } from "@/app/api/debts/schema";
import { useCreate, useGet, useModel } from "@/hooks";
import { useTranslation } from "@/lib/i18n";

import { Model } from "@/components/common/model";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const AddDebtModel = () => {
    const { t } = useTranslation();
    const form = useForm<TDebtSchema>({ resolver: zodResolver(debtSchema) });
    const createDebt = useCreate("/debts", ["debts", "analysis"]);

    // Fetch dynamic groups
    const getGroups = useGet("/groups", ["groups"]);
    const groupOptions = (getGroups.data || []).map((g: any) => ({ value: g._id, label: g.name }));

    const statusOptions = [
        { value: "unpaid", label: t("status.unpaid") },
        { value: "paid", label: t("status.paid") },
    ];

    const { open, type, onClose } = useModel();

    // Set default values after groups are loaded
    const firstGroupId = groupOptions[0]?.value;
    if (firstGroupId && !form.getValues("group")) {
        form.setValue("group", firstGroupId);
        form.setValue("status", "unpaid");
        form.setValue("createdAt", new Date().toISOString().split("T")[0]);
    }

    if (!open || type !== "add-debt") return null;

    const onSubmit = (data: TDebtSchema) => {
        createDebt.mutate(data, {
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    };

    return (
        <Model modelType="add-debt" title={t("modals.addDebt.title")} description={t("modals.addDebt.description")}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                    <Image fill src="/debts.png" alt="Debtor" className="absolute inset-0 z-0 object-cover opacity-10" />

                    <div className="relative">
                        <div className="space-y-6">
                            <Select
                                icon={<CheckCircleIcon className="size-4 text-purple-500" />}
                                options={groupOptions}
                                name="group"
                                label={t("table.group")}
                            />

                            <Input
                                icon={<FileTextIcon className="size-4 text-red-500" />}
                                name="description"
                                label={t("table.description")}
                            />

                            <Input
                                icon={<DollarSignIcon className="size-4 text-blue-500" />}
                                name="amount"
                                label={t("table.amount")}
                                type="number"
                            />

                            <Input
                                icon={<CalendarIcon className="size-4 text-cyan-500" />}
                                name="createdAt"
                                label={t("table.createdAt")}
                                type="date"
                            />

                            <Select
                                icon={<CheckCircleIcon className="size-4 text-green-500" />}
                                options={statusOptions}
                                name="status"
                                label={t("table.status")}
                            />
                        </div>

                        <div className="mt-4 ml-auto w-fit space-x-4 rtl:space-x-reverse">
                            <Button variant="ghost" onClick={onClose}>
                                {t("common.cancel")}
                            </Button>
                            <Button type="submit" className="bg-amber-600 hover:bg-amber-500">
                                {t("common.save")}
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Model>
    );
};

AddDebtModel.displayName = "AddDebtModel";
