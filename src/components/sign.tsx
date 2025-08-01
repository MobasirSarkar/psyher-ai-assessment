import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function LoginButton() {
  return (
    <SignInButton
      signUpFallbackRedirectUrl="/events"
    >
      <Button className="bg-emerald-200">Sign In</Button>
    </SignInButton>
  );
}

