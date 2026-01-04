"use client";
import { PlusIcon, Trash2Icon, EditIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { groupSchema, TGroupSchema } from "@/app/api/groups/schema";
import { useCreate, useUpdate, useDelete, useGet, useModel } from "@/hooks";
import { useTranslation } from "@/lib/i18n";

import { Model } from "@/components/common/model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TGroup = {
    _id: string;
    name: string;
    color: string;
};

export const GroupsManager = () => {
    const { t } = useTranslation();
    const form = useForm<TGroupSchema>({ resolver: zodResolver(groupSchema), defaultValues: { color: "#f59e0b" } });
    const [editingId, setEditingId] = useState<string | null>(null);

    const getGroups = useGet("/groups", ["groups"]);
    const createGroup = useCreate("/groups", ["groups", "analysis"]);
    const updateGroup = useUpdate("/groups", ["groups", "analysis"]);
    const deleteGroup = useDelete("/groups", ["groups", "analysis"]);

    const { open, type, onClose } = useModel();

    if (!open || type !== "manage-groups") return null;

    const onSubmit = (data: TGroupSchema) => {
        if (editingId) {
            updateGroup.mutate(
                { _id: editingId, ...data },
                {
                    onSuccess: () => {
                        form.reset({ color: "#f59e0b", name: "" });
                        setEditingId(null);
                    },
                },
            );
        } else {
            createGroup.mutate(data, {
                onSuccess: () => form.reset({ color: "#f59e0b", name: "" }),
            });
        }
    };

    const handleEdit = (group: TGroup) => {
        setEditingId(group._id);
        form.setValue("name", group.name);
        form.setValue("color", group.color);
    };

    const handleDelete = (id: string) => {
        deleteGroup.mutate(id as any);
    };

    const handleCancel = () => {
        setEditingId(null);
        form.reset({ color: "#f59e0b", name: "" });
    };

    return (
        <Model
            modelType="manage-groups"
            title={t("modals.manageGroups.title")}
            description={t("modals.manageGroups.description")}
        >
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex gap-3">
                        <Input
                            name="name"
                            label={t("modals.manageGroups.groupName")}
                            placeholder={t("modals.manageGroups.groupName")}
                        />
                        <div className="flex flex-col">
                            <label htmlFor="color" className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                {t("modals.manageGroups.color")}
                            </label>
                            <input
                                className="h-10 w-14 cursor-pointer rounded border border-slate-300 dark:border-slate-600"
                                {...form.register("color")}
                                type="color"
                                id="color"
                            />
                        </div>
                        <Button type="submit" className="mt-6 bg-amber-600 hover:bg-amber-500">
                            {editingId ? <EditIcon className="size-4" /> : <PlusIcon className="size-4" />}
                        </Button>
                        {editingId && (
                            <Button type="button" variant="ghost" className="mt-6" onClick={handleCancel}>
                                {t("common.cancel")}
                            </Button>
                        )}
                    </div>
                </form>
            </FormProvider>

            <div className="mt-6 space-y-2">
                <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {t("modals.manageGroups.yourGroups")}
                </h4>
                {(getGroups.data || []).map((group: TGroup) => (
                    <div
                        key={group._id}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div className="flex items-center gap-3">
                            <span className="size-4 rounded-full" style={{ backgroundColor: group.color }} />
                            <span className="font-medium text-slate-800 dark:text-slate-200">{group.name}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleEdit(group)}>
                                <EditIcon className="size-4 text-slate-600 dark:text-slate-400" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(group._id)}>
                                <Trash2Icon className="size-4 text-red-500" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex justify-end">
                <Button variant="ghost" onClick={onClose}>
                    {t("common.close")}
                </Button>
            </div>
        </Model>
    );
};

GroupsManager.displayName = "GroupsManager";
