"use client"

import { useRouter } from "next/navigation"

function LoginButton({children, mode="redirect", }) {

    const router = useRouter();

    const onClickFunc = ()=>{
        router.push("/auth/login")
    }

    if(mode === "redirect"){
        return (
          <span onClick={onClickFunc}>{children}</span>
        )
    }

    if(mode === "modal"){
        return (
            <div>
                This is modal
            </div>
        )
    }
}

export default LoginButton