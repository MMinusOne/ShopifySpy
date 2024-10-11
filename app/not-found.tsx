import Header from "@/components/ui/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-full">
      <div className="flex justify-center items-center w-full h-20">
        <Header />
      </div>

      <div className="min-h-screen hero">
        <div className="text-center hero-content">
          <div className="max-w-full">
            <h1 className="font-bold text-4xl whitespace-nowrap">Ow! The page you're looking for has not been found (ó﹏ò｡)</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
