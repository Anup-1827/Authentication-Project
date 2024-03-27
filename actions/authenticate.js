"use server"

import { signIn } from "@/auth"
import { Response_BP } from "@/lib/config";
import { DEFAULT_Login_Redirect } from "@/routes";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signInMethod(values){
    try{
        // console.log("Sign In Is Called");
        await signIn("credentials", {...values, redirectTo: DEFAULT_Login_Redirect});
        // console.log("LoggedIn");
        // console.log(res_signIn);
    }
    catch(err){
        if (isRedirectError(err)) {
            // console.log("ISRedirect");
            // console.error(err);
            throw err;
        }

        switch (err.type) {
            case "CredentialsSignin":
              return { err: "Invalid credentials!" }
            default:
              return { err: "Something went wrong!" }
          }
    }
}