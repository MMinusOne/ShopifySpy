"use client";

import { useTheme } from "@/components/state/theme";
import "@/styles/globals.scss";

import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  return (
    <ClerkProvider>
      <html
        lang="en"
        data-theme={theme === "dark" ? "dim" : "light"}
        className="w-full h-full"
      >
        <Head>
          <title>ShopifySpy</title>
          <meta
            name="description"
            content="Analyze competitive databases in seconds!"
          />
          <meta property="og:title" content="ShopifySpy" />
          <meta
            property="og:description"
            content="Analyze competitive databases in seconds!"
          />
          <meta property="og:image" content="/assets/Image.png" />
          <meta property="og:url" content="https://shopify-spy.app/" />
        </Head>
        <body className="w-full">{children}</body>
      </html>
    </ClerkProvider>
  );
}
