import z from "zod/v3";

export const debtSchema = z.object({
    group: z.enum(["personal", "civil"]),
    status: z.enum(["paid", "unpaid"]),

    description: z.string().nonempty(),
    amount: z.number().positive(),

    createdAt: z.string().nonempty(),
});

export type TDebtSchema = z.infer<typeof debtSchema>;
