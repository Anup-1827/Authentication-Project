import Link from "next/link"

function BackButton({backButtonLabel, backButtonHref}) {
  return (
    <Link
    href={backButtonHref}
    className="text-sm mx-auto"
    >{backButtonLabel}</Link>
  )
}

export default BackButton