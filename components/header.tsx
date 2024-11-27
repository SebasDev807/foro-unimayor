import Image from "next/image";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";

// TODO: end component
export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-ful">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-3">
          <h1 className="text-2xl font-extrabold  tracking-wide">FUM</h1>
          <Image
            src="/logo-black-white.svg"
            height={40}
            width={40}
            alt="Logo Unimayor"
          />
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            {/* TODO: update deprecate code */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/learn"
              fallbackRedirectUrl="/learn"
            >
              <Button size="lg" variant="ghost">
                Iniciar sesión
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
