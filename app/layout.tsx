import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FUM",
  description: "Foro institucional colegio mayor del cauca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      {...{ frontendApi: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API }}
    >
      <html lang="es">
        <body className={manrope.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
