import { Link } from "react-router-dom";
import { KeyRound } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  return (
    <AuthLayout icon={KeyRound} title="Reset password" subtitle="Demo mode does not send email, but the screen is wired for production." footer={<Link className="text-primary" to="/login">Back to login</Link>}>
      <div className="space-y-4">
        <div className="space-y-2"><Label>Email</Label><Input placeholder="teacher@example.edu" /></div>
        <Button className="w-full" asChild><Link to="/reset-password">Send demo reset link</Link></Button>
      </div>
    </AuthLayout>
  );
}
