import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center text-white h-full text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">

      <div className="font-bold text-9xl">🔏 Auth</div>
      <p className="text-3xl">A simple authentication service</p>

      <LoginButton>
        <Button variant="secondary" size="lg">Signup</Button>
      </LoginButton>

    </div>
  );
}
