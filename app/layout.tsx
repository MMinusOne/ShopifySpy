"use client";

import { useTheme } from "@/components/state/theme";
import "@/styles/globals.scss";

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
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
        <body className="w-full">{children}</body>
      </html>
    </ClerkProvider>
  );
}
