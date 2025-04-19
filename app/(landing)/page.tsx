// TODO: Design the photo mode and implement it

"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { insertUser } from "@/actions/user-sing-in";

import { useTransition } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const [pending, startTransition] = useTransition();

  // Callback triggered when is clicked, updates user progress
  const onClick = () => {
    if (pending) return;

    startTransition(() => {
      insertUser().catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="logo.svg" alt="Logo Unimayor" fill />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          ¡Únete para ser parte de la comunidad!
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/" // Redirección principal
                fallbackRedirectUrl="/" // Redirección de respaldo
              >
                <Button size="lg" variant="primary" className="w-full">
                  Empezar
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/" // Redirección principal
                fallbackRedirectUrl="/" // Redirección de respaldo
              >
                <Button size="lg" variant="primaryOutline" className="w-full">
                  Ya tengo una cuenta
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                variant="primary"
                className="w-full "
                asChild
                onClick={onClick}
              >
                <Link href="/learn">Continuar aprendiendo</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
