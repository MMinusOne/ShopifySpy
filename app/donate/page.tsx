"use client";

import Header from "@/components/ui/Header";
import { useClerk } from "@clerk/nextjs";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [donationUrl, setDonationUrl] = useState();
  const { user, openSignIn, loaded  } = useClerk();
  const goalAmount = 100;

  useEffect(() => {
    console.log({ loaded, user })
    if (!user && loaded) {
      openSignIn();
    } else if(user) {
      console.log('hi')
      const fetchDonationUrl = async () => {
        const { data } = await axios.post(`/api/donate`, {
          productId: "551892",
          userId: user.id || "",
        });
        console.log(data.data.attributes.url);
        if (data) {
          if (data.data.attributes.url) {
            setDonationUrl(data.data.attributes.url);
          }
        }
      };

      fetchDonationUrl();
    }
  }, [user, loaded]);

  const handleDonation = async () => {};

  const progressPercentage = (totalDonations / goalAmount) * 100;

  return (
    <>
      <div className="flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-full">
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-base-100 shadow-xl p-8 rounded-lg w-full max-w-md">
            <h1 className="mb-6 font-bold text-3xl text-center">
              Support Our Project
            </h1>

            <a
              className="mb-6 w-full btn btn-primary"
              onClick={handleDonation}
              href={donationUrl}
              target="_blank"
            >
              {donationUrl ? (
                "Donate"
              ) : (
                <span className="loading loading-md loading-spinner"></span>
              )}
            </a>

            <div className="mb-2">
              <span className="font-semibold text-sm">
                Progress: ${totalDonations.toFixed(2)} / ${goalAmount}
              </span>
            </div>
            <div className="bg-gray-200 rounded-full w-full h-2.5">
              <div
                className="bg-primary rounded-full h-2.5"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
