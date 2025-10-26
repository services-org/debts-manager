"use client";
import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useModel } from "@/hooks";
import { Button } from "../ui/button";

type TDefaultModel = {
    children: React.ReactNode;
    description?: string;
    title: string;
};

type TModel_1 = {
    modelType: string;
};

type TModel_2 = {
    trigger?: string;
    Trigger?: any;
};

type TModel = TDefaultModel & (TModel_1 | TModel_2);

export const Model = ({ title, children, description, ...rest }: TModel) => {
    const { open: modelOpen, type, onClose, onOpen } = useModel();
    const [open, setOpen] = useState(false);

    const isModelType = "modelType" in rest;

    return (
        <Dialog
            onOpenChange={isModelType ? () => onOpen(rest.modelType) : setOpen}
            open={isModelType ? modelOpen : open}
            modal={false}
        >
            {!isModelType && (
                <DialogTrigger>{rest.trigger ? <Button variant="outline">{rest.trigger}</Button> : rest.Trigger}</DialogTrigger>
            )}
            {(open || (isModelType && modelOpen && type === rest.modelType)) && (
                <button
                    className="fixed inset-0 -left-5 z-50 bg-black/80"
                    onClick={() => {
                        setOpen(false);
                        onClose();
                    }}
                />
            )}
            <h2 className="relative z-10 mb-4">Add Debt</h2>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="bg-linear-to-b from-amber-400 to-amber-700 bg-clip-text text-2xl font-bold text-clip text-transparent">
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description ?? "___"}</DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
};

Model.displayName = "Model";
