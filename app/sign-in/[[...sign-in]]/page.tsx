import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6">
      <SignIn />;
    </div>
  );
}
