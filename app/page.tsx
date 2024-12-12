import Image from "next/image";
import { Hero } from "./sections/Hero";
import { Navbar } from "./components/Navbar";
//mt-12 md:mt-[6rem] w-[93%] mx-auto md:container md:max-w-[1100px]
export default function Home() {
  return (
    <div className="">
      <div className="h-screen overflow-hidden">
        <Navbar />
        <Hero />
      </div>
      <div>
        
      </div>
    </div>
  );
}
