import Header from "@/components/ui/Header";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <div className="flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-full">
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 font-bold text-4xl text-center">
              Terms of Service
            </h1>

            <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">
                Data Collection and Storage
              </h2>
              <p className="mb-4">
                ShopifySpy only stores minimal user information, which includes:
              </p>
              <ul className="mb-4 list-disc list-inside">
                <li>Donation status</li>
                <li>Google user information</li>
              </ul>
              <p>
                We do not collect or store any additional personal data or Shopify store information.
              </p>
            </div>

            <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">Service Availability</h2>
              <p>
                Please be aware that ShopifySpy may cease operations at any time without prior notice. We do not guarantee continuous, uninterrupted access to our services.
              </p>
            </div>

            <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">User Responsibility</h2>
              <p>
                Users are solely responsible for their actions and use of data obtained through ShopifySpy. We do not accept any liability for how this information is used or any consequences that may arise from its use.
              </p>
            </div>

            <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">Donor Benefits</h2>
              <p>
                Any benefits provided to donors will remain active for as long as ShopifySpy continues to operate. However, these benefits are subject to the continued operation of our service.
              </p>
            </div>

            <div className="bg-base-100 shadow-xl p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">Account Termination</h2>
              <p className="mb-4">
                ShopifySpy reserves the right to terminate or suspend any user account at any time, for any reason, and without prior notice. This includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside">
                <li>Violation of these terms</li>
                <li>Abusive behavior</li>
                <li>Suspicious activity</li>
                <li>At our sole discretion</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <p className="mb-4">
                By using ShopifySpy, you agree to abide by these terms of service.
              </p>
              <p>
                For any questions or concerns, please{" "}
                <Link href="/about" className="link link-primary">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}