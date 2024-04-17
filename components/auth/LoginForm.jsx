"use client"
import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,  
  } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState, useTransition } from "react";
import login from "@/actions/login";
// import { signIn } from "@/auth";
import { DEFAULT_Login_Redirect } from "@/routes";
import { signInMethod } from "@/actions/authenticate";


function LoginForm() {


    
    const [errMsg, setErrMsg] = useState("")
    const [succMsg, setSucMsg] = useState("")

    const [isPending, startTransition] = useTransition()
     
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email : "",
            password : ""
        }
    })






    const onSubmit = async(values)=>{
        try{
             await signInMethod(values)
        }
        catch(err){
                setErrMsg(err.message)
        }
    }


  return (
    <CardWrapper
        headerLabel = "Welcome back"
        backButtonLabel = "Don't have an account?"
        backButtonHref = "/auth/register"
        showSocials = {true}
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                        control ={ form.control}
                        name = "email"
                        render = {
                            ({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="john.doe@gmail.com"
                                            disabled = {isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }
                    />

                    <FormField
                        control = {form.control}
                        name = "password"
                        render = {
                            ({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="*******"
                                            type = "password"
                                            disabled = {isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }
                    />
                </div>
                <FormError message={errMsg}/>
                <FormSuccess message={succMsg}/>
                <Button  className="w-full"
                    disabled = {isPending}
                >
                    Login
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm