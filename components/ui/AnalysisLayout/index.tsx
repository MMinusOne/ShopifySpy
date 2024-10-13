"use client";

import { useTheme } from "@/components/state/theme";
import "@/styles/globals.scss";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <html lang="en" data-theme={theme === "dark" ? "dim" : "light"} className="w-[100vw] h-[100vh]">
      <Head>
        <title>ShopifySpy</title>
        <meta name="description" content="Analyze competitive databases in seconds!" />
        <meta property="og:title" content="ShopifySpy" />
        <meta property="og:description" content="Analyze competitive databases in seconds!" />
        <meta property="og:image" content="/assets/Image.png" />
        <meta property="og:url" content="https://shopify-spy.app/" />
      </Head>
      <body className="w-full h-full overflow-x-hidden">{children}</body>
    </html>
  );
}