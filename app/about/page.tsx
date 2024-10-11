import Header from "@/components/ui/Header";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-full">
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 font-bold text-4xl text-center">
              About ShopifySpy
            </h1>

            <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">
                What is ShopifySpy?
              </h2>
              <p className="mb-4">
                ShopifySpy is a powerful tool that allows you to access and
                analyze databases of any Shopify store. With our application,
                you can download and explore comprehensive data, giving you
                valuable insights into various Shopify businesses.
              </p>
              <p>
                Created on October 11, 2024, by Michael Salloum, ShopifySpy aims
                to provide a free and accessible solution for Shopify data
                analysis.
              </p>
            </div>

            <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">Features</h2>
              <ul className="list-disc list-inside">
                <li>Access to Shopify store databases</li>
                <li>Comprehensive data analysis tools</li>
                <li>Ability to download store data</li>
                <li>Free to use</li>
                <li>Ad-supported model</li>
              </ul>
            </div>

            <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">Future Plans</h2>
              <p>
                While ShopifySpy is currently free to use, we are considering
                introducing a pro plan in the future to offer enhanced features
                and capabilities.
              </p>
            </div>

            <div className="bg-base-100 shadow-xl p-6 rounded-box">
              <h2 className="mb-4 font-semibold text-2xl">Contact & Support</h2>
              <p className="mb-4">
                For support or inquiries, you can reach out to us via:
              </p>
              <ul className="mb-4 list-disc list-inside">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:michael.business.lb@proton.me"
                    className="link link-primary"
                  >
                    michael.business.lb@proton.me
                  </a>
                </li>
                <li>
                  Discord:{" "}
                  <Link
                    href="https://discord.gg/shopifyspynet"
                    className="link link-primary"
                  >
                    Join our Discord community
                  </Link>
                </li>
              </ul>
              <p>
                Don't forget to check out our{" "}
                <Link
                  href="https://www.youtube.com/channel/YourChannelID"
                  className="link link-primary"
                >
                  YouTube channel
                </Link>{" "}
                for helpful tutorials and tips!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
