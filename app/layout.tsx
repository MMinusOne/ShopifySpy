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
      <script type='text/javascript' src='//pl24659944.cpmrevenuegate.com/0e/8d/96/0e8d962c7cfe8f9df33d174022462121.js'></script>
        <body className="w-full">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
