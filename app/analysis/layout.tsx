import "@/styles/globals.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopifySpy",
  description:
    "Spy on your shopify competitor's information, database items, and much more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" data-theme="emerald" className="w-[100vw] h-[100vh]">
        <body className="w-full h-full overflow-x-hidden">{children}</body>
      </html>
  );
}
