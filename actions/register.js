"use server"

import dbConnect from "@/lib/db";
import  User  from "@/model/User";
import { RegisterSchema } from "@/schema"
import { data } from "autoprefixer";
import bcrypt  from "bcrypt"

import { Response_BP } from "@/lib/config"

async function register(values) {

    const validateRes = RegisterSchema.safeParse(values)

        // console.log(validateRes);
    const responseDtl = Response_BP();

    
    if(validateRes.success){

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(validateRes.data.password, genSalt)
        
        const isConnectedToDB = await dbConnect();
        // console.log(isConnectedToDB);

        if(isConnectedToDB?.success){
            const findUniqueUser = await User.find({"email" : validateRes?.data?.email})

            if(findUniqueUser.length >0){

                responseDtl.success = false;
                responseDtl.code = 409;
                responseDtl.message = "User already exist";
                
                return responseDtl;
            }

            const newUser = await new User({
                ...validateRes.data,
                password: hashedPassword 
            }).save()

            responseDtl.success = true;
            responseDtl.code = 201;
            responseDtl.message = "Registered Successfully!!!";
            
            return responseDtl;
        }
    }
    
    responseDtl.success = false;
    responseDtl.code = 500;
    responseDtl.message = "Fields are not valid!!";
    
    return responseDtl;
}

export default register