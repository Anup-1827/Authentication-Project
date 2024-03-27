"use server"

import GitHub from "next-auth/providers/github"
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import authConfig from "./auth.config.js";
import {clientPromise} from "./lib/db"

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import { Response_BP } from "./lib/config";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcrypt"

export const {
  // handler: {GET, POST}, 
  auth, 
  signIn
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  providers:[
      Credentials({
        async authorize(credentials){
          const validatedFields = LoginSchema.safeParse(credentials);

          const responseDtl = Response_BP();

          if(validatedFields.success){
            const { email, password } = validatedFields.data;

            const user = await getUserByEmail(email);

            if(!user && !user.password) return null;

            const passwordMatch = await bcrypt.compare(password, user.password)

            if(passwordMatch){
              // responseDtl.success = true;
              // responseDtl.code = 201;
              // responseDtl.data = user
              // return  responseDtl
              return  true
            }
          }

          return null;
        }
      })
  ]


})

// export const {
//   // handlers: { GET, POST },
//   auth, 
//   signIn
// } = NextAuth({
//   adapter: MongoDBAdapter(clientPromise, {databaseName: "NextAuthClone"}),
//   session: { strategy: "jwt" },
//   // ...authConfig,
//     // providers: [GitHub],
//   providers: [
//     // GitHub,
//     Credentials({
//       async authorize(credentials) {
//         const responseDtl = Response_BP();
//         try{
//           const validatedFields = LoginSchema.safeParse(credentials);

//           if (validatedFields.success) {
//             const { email, password } = validatedFields.data;

//             const client = await clientPromise;
//             const db = await client.db("NextAuth")

//             console.log("Daatabase Connected");
//             const userCollection = await db.collection("users")
//             const user = await userCollection.findOne({email})

//             if(!user){
//               responseDtl.success = false;
//               responseDtl.error_message = "User doest not exist."
//               responseDtl.code = 404;
              
//               return responseDtl;
//             }
            
//             // .findOne({email})
//             console.log("user");
//             console.log(user);
//             // console.log(dn);

//             // const user = await db.
//             // const user = await clientPromise.user.findUnique({email})
//             // const user = await getUserByEmail(email);
//             // if (!user || !user.password) return null;
  
//             // const passwordsMatch = await bcrypt.compare(
//             //   password,
//             //   user.password,
//             // );
  
//             // if (passwordsMatch) return user;
//             return { success: true}
//             // return null
//           }
//           else{
//             console.log("Invalid");
//             responseDtl.success = false;
//             responseDtl.code = 401;
//             responseDtl.error_message = "Invalid Credentials !!!";
//             return responseDtl;
//           }
//         }
//         catch(err){
//           responseDtl.success = false;
//           console.log("Inside Catch");
//           switch(err.type){
//             case"CredentialsSignin":
//               responseDtl.code = 500;
//               responseDtl.error_message = `Something went wrong in ${err.type}`
//               return responseDtl;
//               break;
//           }
//         }


//       }
//     })
//   ],
// });
