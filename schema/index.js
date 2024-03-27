import * as z from "zod";

const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required/invalid"
    }),
    password : z.string().min(1,{
        message: "Password is required/incorrect"
    })
})

const RegisterSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required/invalid"
    }),
    password : z.string().min(1,{
        message: "Password is required/incorrect"
    })
})

export {LoginSchema, RegisterSchema}