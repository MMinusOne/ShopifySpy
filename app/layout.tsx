"use client";

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
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : 'fddf1e5313e5b1e09fe510baf4c1ab3a',
                  'format' : 'iframe',
                  'height' : 60,
                  'width' : 468,
                  'params' : {}
                };
              `,
            }}
          />
          <script src="//www.topcpmcreativeformat.com/fddf1e5313e5b1e09fe510baf4c1ab3a/invoke.js" />
        </body>
      </html>
    </ClerkProvider>
  );
}
