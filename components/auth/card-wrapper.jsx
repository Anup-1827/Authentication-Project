import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import BackButton from "./back-button"
import Header from "./header"
import Social from "./social"

function CardWrapper({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocials
}) {
  return (
    <Card className = "w-[400px]">
        <CardHeader>
            <Header headerLabel={headerLabel}/>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    
        {
         showSocials && <CardFooter>
            <Social/>
         </CardFooter>   
        }

        <CardFooter>
            <BackButton backButtonLabel={backButtonLabel} backButtonHref={backButtonHref}/>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper