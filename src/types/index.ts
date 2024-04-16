import { z } from "zod";
const signup = z.object({
     email: z.string().email({
          message: "Invalid email",
     }),
     name: z.string(),
     password: z.string().min(8,{
          message: "Password should be atleast 8 characters long",
     }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,{
          message: "Password should contain atleast one uppercase, one lowercase and one digit",
     }),
});
export type SingupData = z.infer<typeof signup>;
const login = z.object({
     email: z.string().email({
          message: "Invalid email"
     }),
     password: z.string(),
});
export type LoginData = z.infer<typeof login>;
const result = z.object({
     score: z.number().max(100).min(0),
     accuracy: z.number().max(100).min(0),
     duration: z.number(),
});
export type ResultData = z.infer<typeof result>;