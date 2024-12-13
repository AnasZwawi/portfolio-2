import { Hero } from "./sections/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./sections/Projects";
import { Tape } from "./sections/Tape";
import { Testimonials } from "./sections/Testimonials";
import { About } from "./sections/About";
//mt-12 md:mt-[6rem] w-[93%] mx-auto md:container md:max-w-[1100px]
export default function Home() {
  return (
    <div className="">
      <div className="h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
        <Navbar />
        <Hero />
      </div>
      <div>
        <Projects />
        <Tape />
        <Testimonials/>
        <About/>
      </div>
    </div>
  );
}
