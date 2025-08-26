import z from "zod/v3";

export const debtSchema = z.object({
    description: z.string().nonempty(),
    status: z.enum(["paid", "unpaid"]),
    createdAt: z.string().nonempty(),
    amount: z.number().positive(),
});

export type TDebtSchema = z.infer<typeof debtSchema>;
