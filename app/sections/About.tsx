import { Sparkle } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  RiCss3Fill,
  RiHtml5Fill,
  RiJavascriptFill,
  RiNextjsFill,
  RiReactjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { Skill } from "../components/Skill";
import { SiShadcnui, SiTypescript } from "react-icons/si";
import {
  BiLogoDjango,
  BiLogoGoLang,
  BiLogoPostgresql,
  BiLogoTypescript,
} from "react-icons/bi";
import { DiPython } from "react-icons/di";
import { FaGolang } from "react-icons/fa6";
import { AiFillApi } from "react-icons/ai";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
