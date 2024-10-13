import Layout from "@/components/ui/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopifySpy",
  description: "Analyze competitive databases in seconds!",
  openGraph: {
    title: "ShopifySpy",
    description: "Analyze competitive databases in seconds!",
    images: [
      {
        url: "/assets/Image.png",
      },
    ],
    url: "https://shopify-spy.app/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout children={children} />;
}