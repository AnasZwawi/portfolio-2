import React from "react";
import { AboutSectionOne } from "../components/AboutSectionOne";
import { AboutSectionTwo } from "../components/AboutSectionTwo";

export const About = () => {
  return (
    <div id="about" className="w-[93%] mx-auto md:max-w-[1000px] my-[4rem] py-[2rem]">
      <div className="max-w-[430px] mx-auto mb-[4rem] mt-20">
        <div className="rounded-lg bg-black uppercase text-white text-sm w-fit mx-auto px-3 py-1">
          About Me{" "}
        </div>
        <h1 className="text-[28px] md:text-[35px] uppercase leading-tight font-black text-center mt-3 mb-2">
          A Glimpse into my world{" "}
        </h1>
        <p className="font-medium text-center">
          Learn more about who am I, what I do, and what inspires me.
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <AboutSectionOne />
        <AboutSectionTwo />
      </div>
    </div>
  );
};
