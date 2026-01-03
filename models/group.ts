import { Schema, models, model } from "mongoose";

export type TGroup = {
    _id: string;
    name: string;
    color: string;
    userId: string;
    createdAt: Date;
};

const GroupSchema = new Schema<TGroup>({
    userId: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now },

    color: { type: String, required: true, default: "#f59e0b" },
    name: { type: String, required: true, trim: true },
});

// Compound index for unique group names per user
GroupSchema.index({ name: 1, userId: 1 }, { unique: true });

export const Groups = models.Groups || model<TGroup>("Groups", GroupSchema);
