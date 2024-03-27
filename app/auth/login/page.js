import LoginForm from "@/components/auth/LoginForm"

function Login() {
  return (
    <div className="h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800 flex justify-center items-center">
      <LoginForm/>
    </div>
  )
}

export default Login