import type { FormEvent } from "react";
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
function Login() {
  const navigate = useNavigate();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await login({ email, password });
      //if ok redirect
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      console.error(`Error : ${error}`);
      toast.error("Invalid email or password");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
