import { Metadata } from "next";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to ask and answer questions",
};

const Login = () => {
  return (
    <div className="flex h-full min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Login;
