import { useTheme } from "@/components/state/theme";
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
  const { theme } = useTheme();
  return (
      <html lang="en" data-theme={theme === "dark"? "dim": "light"} className="w-[100vw] h-[100vh]">
        <body className="w-full h-full overflow-x-hidden">{children}</body>
      </html>
  );
}
