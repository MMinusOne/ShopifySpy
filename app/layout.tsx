"use client";

import AdsterraAd from "@/components/lib/AdsTerra";
import "@/styles/globals.scss";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="emerald" className="w-full h-full">
        <body className="w-full">
          {children}
          <AdsterraAd
            atOptions={{
              key: 'b7081c03a15d9a99b3866fcb2327a6e4',
              format: 'iframe',
              height: 60,
              width: 468,
              params: {}
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
