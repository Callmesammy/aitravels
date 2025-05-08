import { z } from "zod";

export const formSchema = z.object({
    country: z.string({ required_error: "A country must be selected " }),
    duration: z.coerce.number({ required_error: "Enter number of days to stay" }), 
    travel: z.string({ required_error: "select group type" }),
    group: z.string({ required_error: "select group type" }),
    interest: z.string({ required_error: "select group type" }),
    budget: z.string({ required_error: "select group type"}),
  });