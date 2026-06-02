import { Link, useNavigate } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/AuthContext";
import { isDemoMode } from "@/config/runtime";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await login();
    navigate("/");
  };

  return (
    <AuthLayout
      icon={ClipboardCheck}
      title="Welcome back"
      subtitle={isDemoMode ? "Use the sample credentials and present without hardware." : "Sign in to manage bathroom sign-out and sign-in."}
      footer={<><Link className="text-primary" to="/register">Create an account</Link> · <Link className="text-primary" to="/forgot-password">Forgot password?</Link></>}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2"><Label>Email</Label><Input defaultValue={isDemoMode ? "demo@bathroom-pass.local" : ""} placeholder="teacher@example.edu" /></div>
        <div className="space-y-2"><Label>Password</Label><Input type="password" defaultValue={isDemoMode ? "demo-mode" : ""} /></div>
        <Button className="w-full" type="submit">{isDemoMode ? "Enter demo workspace" : "Sign in"}</Button>
      </form>
    </AuthLayout>
  );
}
