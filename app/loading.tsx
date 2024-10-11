import Header from "@/components/ui/Header";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-full">
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>
        <div className="justify-center items-center w-full h-full">
          <span className="text-primary loading loading-bars loading-lg"></span>
        </div>
      </div>
    </>
  );
}
