import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  return (
    <AuthLayout icon={UserPlus} title="Create workspace" subtitle="Registration is mocked locally for demos." footer={<Link className="text-primary" to="/login">Already have an account?</Link>}>
      <div className="space-y-4">
        <div className="space-y-2"><Label>Name</Label><Input placeholder="Teacher name" /></div>
        <div className="space-y-2"><Label>Email</Label><Input placeholder="teacher@example.edu" /></div>
        <Button asChild className="w-full"><Link to="/">Continue to demo</Link></Button>
      </div>
    </AuthLayout>
  );
}
