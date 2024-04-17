"use server"

import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import dbConnect from "./lib/db"

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from "bcrypt"

export const {
  // handlers: {GET, POST}, 
  auth, 
  signIn,
  signOut
} = NextAuth({
  adapter: MongoDBAdapter(dbConnect()),
  session: { strategy: "jwt" },
  callbacks:{
    async jwt({token}){
      if(!token.sub) return token;

      const exisitingUser = await getUserById(token.sub);

      if(!exisitingUser) return token;

      token.role = exisitingUser.role;
      // token.customField = "Anup"
      // console.log(token);
      return token;
    },
    async session({token, session}){
      // console.log("Token ", token); 
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role
      }
      // console.log("Session ", session); 
      return session
    }
  },
  providers:[
      Credentials({
        async authorize(credentials){
          const validatedFields = LoginSchema.safeParse(credentials);
          if(validatedFields.success){
            const { email, password } = validatedFields.data;

            const user = await getUserByEmail(email);

            if(!user && !user.password) return null;

            const passwordMatch = await bcrypt.compare(password, user.password)

            if(passwordMatch){
              return  user
            }
          }

          return null;
        }
      })
  ]
})
