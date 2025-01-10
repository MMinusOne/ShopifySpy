"use client";

import fetchProducts from "@/components/lib/api/fetchProducts";
import isSpyable from "@/components/lib/api/IsSpyable";
import constructChartData from "@/components/lib/constructChartData";
import Header from "@/components/ui/Header";
import ProductTable from "@/components/ui/ProductTable";
import ProductTypeChart from "@/components/ui/ProductTypeChart";
import VendorChart from "@/components/ui/VendorChart";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaFileCsv } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { stringify } from "csv-stringify/sync";
import { useClerk } from "@clerk/nextjs";
import axios from "axios";

export default function Analysis({ websiteUrl }: { websiteUrl: string }) {
  const router = useRouter();
  const { user, openSignIn, loaded } = useClerk();
  const url = decodeURIComponent(websiteUrl);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productDistribution, setProductDistribution] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });
  const [vendorDistribution, setVendorDistribution] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });
  const [progress, setProgress] = useState({ page: 0, items: 0 });
  const [page, setPage] = useState(1);
  const [hasDonated, setHasDonated] = useState();

  useEffect(() => {
    if (!user && loaded) {
      openSignIn();
    } else if (user) {
      const checkDonationStatus = async () => {
        const response = await axios.post("/api/payments/hasDonated", {
          userId: user.id,
        });
        if (response.data) setHasDonated(response.data.hasDonated);
      };

      checkDonationStatus();
    }
  }, [user, loaded]);

  useEffect(() => {
    console.log(hasDonated);
  }, [hasDonated]);

  const exportToCSV = () => {
    const header = [
      "Variant ID",
      "Title",
      "Origin Product ID",
      "Product Type",
      "Vendor",
      "Variant Title",
      "Option1",
      "Option2",
      "Option3",
      "SKU",
      "Requires Shipping",
      "Taxable",
      "Featured Image",
      "Available",
      "Price",
      "Grams",
      "Compare At Price",
      "Position",
      "Created At",
      "Updated At",
      "Product Images",
    ];

    // const exportProducts = hasDonated ? products : products.slice(0, 100);
    const exportProducts = products;

    const data = exportProducts.flatMap((product) =>
      product.variants.map((variant, variantIndex) => [
        `"${variant.id.toString()}"`,
        product.title,
        product.id,
        product.product_type,
        product.vendor,
        variant.title,
        variant.option1,
        variant.option2,
        variant.option3,
        variant.sku,
        variant.requires_shipping,
        variant.taxable,
        variant.featured_image?.src,
        variant.available,
        `"${variant.price}"`,
        variant.grams,
        `"${variant.compare_at_price}"`,
        variant.position,
        variant.created_at,
        variant.updated_at,
        product.images.map((img) => img.src).join("|"),
      ])
    );

    const csvContent = stringify([header, ...data], { delimiter: "," });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "product_variants.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const checkIsValid = async () => {
      const isValid = await isSpyable(url);
      if (!isValid) {
        router.push("/analysis");
        return false;
      }
      return isValid;
    };

    const getProducts = async () => {
      await checkIsValid();
      const requestedProducts = await fetchProducts(url, setProgress);
      setProducts(requestedProducts!);
      setLoading(false);
    };
    if (products.length === 0) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    if (products) {
      constructChartData(
        products,
        setProductDistribution,
        setVendorDistribution
      );
    }
  }, [products]);

  useEffect(() => {
    console.log({ productDistribution, vendorDistribution });
  }, [vendorDistribution, productDistribution]);
  return (
    <>
      <div
        className={`flex flex-col justify-center gap-4 bg-base-100 p-6 w-full ${
          loading ? "h-full" : ""
        }`}
      >
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>
        {loading ? (
          <>
            <div className="flex justify-center items-center w-full h-full">
              <p className="flex flex-col justify-center items-center gap-2 font-bold text-base-content text-xl md:text-4xl">
                Loading store data! This may take a while (˶ᵔ ᵕ ᵔ˶){" "}
                <span className="flex justify-end items-end loading loading-dots loading-lg"></span>
                <span className="flex justify-end items-en text-md md:text-3xl">
                  (
                  {new Intl.NumberFormat("en", {
                    notation: "compact",
                  }).format(progress.items)}{" "}
                  products)
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col p-4 w-full h-full">
            <div className="flex justify-start items-center gap-5 w-full">
              <button className="text-lg btn btn-link">{url}</button>
              <a className="btn btn-primary btn-xs" href="/analyse">
                <FaArrowLeft /> Spy On Another
              </a>
            </div>

            <div className="gap-3 grid grid-cols-1 md:grid-cols-2 grid-rows-2 w-full overflow-hidden overflow-y-scroll">
              <div className="flex flex-col justify-center items-center h-full min-h-full max-h-full">
                <div className="flex flex-col justify-center items-center p-6 w-full">
                  <p className="w-full font-bold text-2xl text-start">
                    Export Data (
                    {new Intl.NumberFormat("en", {
                      notation: "compact",
                    }).format(products.length)}{" "}
                    items)
                  </p>
                </div>

                <div className="flex justify-center items-center w-full h-1/2">
                  <div className="flex flex-col justify-center items-center gap-3 p-12">
                    <a
                      onClick={exportToCSV}
                      className="btn btn-primary btn-wide"
                    >
                      Export to CSV <FaFileCsv className="fill-neutral" />{" "}
                    </a>
                    <a
                      href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(
                          // hasDonated ? products : products.slice(0, 100)
                          products
                        )
                      )}`}
                      download="products.json"
                      className="btn btn-warning btn-wide"
                    >
                      Export to JSON <b className="fill-neutral">{"{}"}</b>
                    </a>
                    <a className="btn btn-base-300 btn-wide" href={url}>
                      Visit Page{" "}
                      <FaArrowRightToBracket className="fill-base-content" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center h-full min-h-full max-h-full">
                <div className="flex flex-col justify-center items-center p-6 w-full">
                  <p className="w-full h-16 font-bold text-2xl text-start">
                    Product Distribution
                  </p>
                </div>

                <div className="flex justify-center items-center w-full">
                  <ProductTypeChart
                    labels={productDistribution.labels}
                    data={productDistribution.data}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center h-full min-h-full max-h-full">
                <div className="flex flex-col justify-center items-center p-6 w-full">
                  <p className="w-full h-16 font-bold text-2xl text-start">
                    Vendor Distribution
                  </p>
                </div>

                <div className="flex justify-center items-center w-full">
                  <VendorChart
                    labels={vendorDistribution.labels}
                    data={vendorDistribution.data}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-3 p-4 min-h-full max-h-full">
                <div className="flex justify-center items-center max-w-2xl overflow-hidden overflow-y-scroll">
                  <ProductTable products={products} page={page} />
                </div>
                <div className="join">
                  <button
                    className="btn join-item"
                    onClick={() => {
                      if (page !== 1) setPage(page - 1);
                    }}
                  >
                    «
                  </button>
                  <button className="btn join-item">Page {page}</button>
                  <button
                    className="btn join-item"
                    onClick={() => {
                      if (page !== Math.floor(products.length / 5))
                        setPage(page + 1);
                    }}
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
