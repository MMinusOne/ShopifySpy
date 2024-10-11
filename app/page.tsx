import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-full">
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>
          <Hero />       
      </div>
    </>
  );
}
