import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        {/* TODO: check if it works */}
        <Link href="https://wa.me/5728240562" passHref>
          <Button size="lg" variant="ghost" className="w-full">
            <Image
              src="/phone-call.png"
              alt="Número telefonico"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            (+57) 8240562
          </Button>
        </Link>
        <Link
          href="https://www.facebook.com/unimayor"
          target="_blank"
          className="mr-4 rounded-md"
        >
          <Button size="lg" variant="ghost" className="w-full">
            <Image
              src="/facebook.png"
              alt="Numero telefonico"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Facebook
          </Button>
        </Link>
        <Link
          href="https://www.youtube.com/user/colmayorcauca"
          target="_blank"
          className="mr-4 rounded-md"
        >
          <Button size="lg" variant="ghost" className="w-full">
            <Image
              src="/youtube.png"
              alt="Youtube"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Youtube
          </Button>
        </Link>

        {/* <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/it.svg"
            alt="Italian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/jp.svg"
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button> */}
      </div>
    </footer>
  );
};
