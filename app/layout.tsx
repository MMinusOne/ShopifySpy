"use client";

import "@/styles/globals.scss";

import { ClerkProvider } from "@clerk/nextjs";

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
        </body>
      </html>
    </ClerkProvider>
  );
}
