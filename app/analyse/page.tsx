"use client";

import isSpyable from "@/components/lib/api/IsSpyable";
import Header from "@/components/ui/Header";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Analyse() {
  const { openSignIn, user } = useClerk();
  const [websiteUrl, setWebsiteUrl] = useState<string>();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      openSignIn();
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-full">
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>
        <div className="min-h-screen hero">
          <div className="w-full text-center hero-content">
            <div className="w-full max-w-3xl">
              <h1 className="py-6 font-bold text-5xl">ShopifySpy</h1>
              {loading ? (
                <>
                  <div className="flex justify-center items-center w-full h-full">
                    <span className="text-primary loading loading-bars loading-lg"></span>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-normal">
                    Enter any Shopify website's URL!
                  </p>
                  <div className="flex md:flex-row flex-col justify-center items-center gap-2 w-full h-36">
                    <input
                      type="url"
                      placeholder="Shopify URL"
                      className="flex m-2 input-bordered w-full max-w-xs input"
                      onInput={(e) => {
                        setWebsiteUrl(e.currentTarget.value);
                      }}
                    />
                    <SignedIn>
                      <button
                        className="w-full md:w-fit max-w-xs btn btn-primary"
                        onClick={async () => {
                          setError("");
                          setLoading(true);

                          if (!websiteUrl) {
                            setError("Please enter a URL!");
                            setLoading(false);
                            return;
                          }
                          try {
                            const urlConstruct = new URL(websiteUrl);
                            const url = urlConstruct.protocol
                              .concat("//")
                              .concat(urlConstruct.hostname);
                            const isValid = await isSpyable(url);

                            if (isValid) {
                              router.push(
                                `/analysis/${encodeURIComponent(url)}`
                              );
                              setLoading(false);
                            } else {
                              setError(
                                "URL is not a Shopify store! Try again."
                              );
                              setLoading(false);
                            }
                          } catch (e) {
                            setError(
                              `Ow! URL is not a valid Shopify store! Try again.`
                            );
                            setLoading(false);
                          }
                        }}
                      >
                        Spy
                      </button>
                    </SignedIn>

                    <SignedOut>
                      <button
                        className="w-full md:w-fit max-w-xs btn btn-primary"
                        onClick={async () => {
                          openSignIn();
                        }}
                      >
                        Sign In
                      </button>
                    </SignedOut>
                  </div>

                  <div>
                    <p className="text-error text-md">{error}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
