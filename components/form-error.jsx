import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

function FormError({message}) {
    if(!message) return
  return (
    <div className="w-full bg-destructive/15 flex items-center rounded-lg text-destructive p-3">
        <ExclamationTriangleIcon className="w-4 h-4 mr-2"/>
        {message}
    </div>
  )
}

export default FormError