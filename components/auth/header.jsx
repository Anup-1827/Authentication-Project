import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

function Header({ headerLabel }) {
  return (
    <div className="flex items-center flex-col gap-3">
      <h1 className={cn("text-3xl font-semibold", font.className)}>🔏 Auth</h1>
      <p className="text-muted-foreground text-sm">{headerLabel}</p>
    </div>
  );
}

export default Header;
