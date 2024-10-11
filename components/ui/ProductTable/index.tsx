import { Product } from "@/types";
import Image from "next/image";

export default function ProductTable(props: {
  products: Product[];
  page: number;
}) {
  const { page } = props;
  const pageIndexStart = page * 5;
  const pageIndexEnd = pageIndexStart + 5;

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Vendor</th>
              <th>Variants Count</th>
              <th>Images Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.products
              .slice(pageIndexStart, pageIndexEnd)
              .map((product, productIndex) => {
                return (
                  <>
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 mask mask-squircle">
                              <Image
                                //@ts-ignore
                                src={product.images.at(0).src}
                                alt="Product Image"
                                //@ts-ignore
                                width={product.images.at(0).width}
                                //@ts-ignore
                                height={product.images.at(0).height}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold truncate">
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        ${product!.variants!.at(0)!.price}
                        <br />
                      </td>

                      <td>{product.vendor}</td>
                      <td>{product.variants.length}</td>
                      <td>{product.images.length}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Vendor</th>
              <th>Variants Count</th>
              <th>Images Count</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
