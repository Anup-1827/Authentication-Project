import { Button } from "../ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";


function Social() {
  return (
    <div className="w-full flex gap-2">
        <Button variant="outline" size="lg" className="w-full">
            <FcGoogle size="20px"/>
        </Button>   
        <Button variant="outline" size="lg" className="w-full">
            <FaGithub size="20px"/>
        </Button>   
    </div>      
  )
}

export default Social