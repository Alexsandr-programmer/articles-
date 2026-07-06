import z from "zod";

export const articleScheme = z.object({
  content: z.string().min(8, { message: "min chars in article - 8" }),
  title: z.string().min(1, { message: "min chars in title - 1" }),
});
