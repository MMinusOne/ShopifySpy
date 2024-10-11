"use client";

import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

export default function Hero() {
  const { openSignIn } = useClerk();

  return (
    <>
      <div className="min-h-screen hero">
        <div className="text-center hero-content">
          <div className="max-w-3xl">
            <h1 className="font-bold text-5xl">ShopifySpy</h1>
            <p className="py-6 font-normal">
              ShopifySpy is a powerful tool that allows you to analyze your
              Shopify competitors. With ShopifySpy, you can access their
              database of items, their reported revenue, and traffic. Stay ahead
              of the competition and make informed decisions for your business.
            </p>
            <SignedOut>
              <button
                onClick={() => {
                  openSignIn();
                }}
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </SignedOut>
            <SignedIn>
              <a className="btn btn-primary" href="/analyse">Get Started</a>
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
}
