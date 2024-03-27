import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons"

function FormSuccess({message}) {
    if(!message) return
  return (
    <div className="w-full bg-emerald-500/15 flex items-center rounded-lg text-emerald-500 p-3">
        <CheckCircledIcon className="w-4 h-4 mr-2"/>
        {message}
    </div>
  )
}

export default FormSuccess