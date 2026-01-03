import z from "zod/v3";

export const groupSchema = z.object({
    name: z.string().nonempty().max(50),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
});

export type TGroupSchema = z.infer<typeof groupSchema>;
