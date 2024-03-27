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
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState, useTransition } from "react";
import register from "@/actions/register";


function RegisterForm() {

    const [errMsg, setErrMsg] = useState("")
    const [succMsg, setSucMsg] = useState("")

    const [isPending, startTransition] = useTransition()
     
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
            name:"",
            email : "",
            password : ""
        }
    })

    const onSubmit = (values)=>{
        setErrMsg("")
        setSucMsg("")
        startTransition(
            ()=>(
            register(values)
            .then(res=>{
                if(res.status === 201 || res.success){
                    setSucMsg(res?.message)
                }else{
                    setErrMsg(res?.message)
                }
            })
            )
        )
    }


  return (
    <CardWrapper
        headerLabel = "Create an account"
        backButtonLabel = "Already have an account?"
        backButtonHref = "/auth/login"
        showSocials = {true}
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                <FormField
                        control ={ form.control}
                        name = "name"
                        render = {
                            ({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="John Doe"
                                            disabled = {isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }
                    />


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
                    Register
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm