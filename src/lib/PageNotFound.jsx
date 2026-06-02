import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";

export default function PageNotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-lg w-full border-0 shadow-xl">
        <CardContent className="p-10 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">That page wandered off.</h1>
          <p className="mt-3 text-muted-foreground">
            Return to the Bathroom Pass dashboard to continue bathroom sign-out/sign-in tracking.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
