"use server";

import Analysis from "./analysis";

export default async function Page({
  params,
}: {
  params: Promise<{ websiteUrl: string }>;
}) {
  const { websiteUrl } = await params;
  return <Analysis websiteUrl={websiteUrl} />;
}
