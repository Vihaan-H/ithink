import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPassword() {
  return (
    <AuthLayout icon={LockKeyhole} title="Choose new password" subtitle="Complete the mocked reset flow and return to demo mode." footer={<Link className="text-primary" to="/login">Back to login</Link>}>
      <div className="space-y-4">
        <div className="space-y-2"><Label>New password</Label><Input type="password" /></div>
        <div className="space-y-2"><Label>Confirm password</Label><Input type="password" /></div>
        <Button className="w-full" asChild><Link to="/">Update password</Link></Button>
      </div>
    </AuthLayout>
  );
}
