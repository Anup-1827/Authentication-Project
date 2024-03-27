"use server"

import { LoginSchema } from "@/schema"
import User from "@/model/User"
import clientPromise from "@/lib/db"
import bcrypt from "bcrypt"

import { Response_BP } from "@/lib/config"


async function login(values) {

    const validateRes = LoginSchema.safeParse(values);
    
    const responseDtl = Response_BP();

    if(validateRes.success){
        const isConnectedToDB = await clientPromise;

        // console.log("ClientPromise");
        // console.log(clientPromise);
        // console.log(isConnectedToDB);

        // console.log(isConnectedToDB);
        if(isConnectedToDB){
            const findUniqueUser = await User.findOne({"email" : validateRes?.data?.email})

            if(!findUniqueUser){
                responseDtl.success = false;
                responseDtl.code = 204;
                responseDtl.message = "User does not exit";
                
                return responseDtl;
            }

            const comparePwd = await bcrypt.compare(validateRes.data.password, findUniqueUser.password)

            if(!comparePwd){

                responseDtl.success = false;
                responseDtl.code = 204;
                responseDtl.message = "Password is Incorrect";
                
                return responseDtl;
            }

            responseDtl.success = true;
            responseDtl.code = 201;
            responseDtl.message ="Loggedin Successfully!!!";
            
            return responseDtl
        }
    }

    responseDtl.success = false;
    responseDtl.code = 500;
    responseDtl.message ="Fields are not valid!!";
    
    return responseDtl

}

export default login