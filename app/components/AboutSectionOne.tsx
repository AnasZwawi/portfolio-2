import { Sparkle } from "lucide-react";
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
import { SiFastapi, SiShadcnui } from "react-icons/si";
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
import { TbApi } from "react-icons/tb";

export const AboutSectionOne = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3 border border-gray-300 ring-2 ring-black/80 rounded-lg">
        <div className="p-6">
          <div className="w-fit mx-auto relative -left-2 flex items-center gap-2 md:gap-1 text-2xl">
            <Sparkle
              className="size-6 md:size-5 relative bottom-[1px]"
              strokeWidth={3}
            />{" "}
            <span className="font-black">Who Am I</span>
          </div>
          <div className="mt-4 text-sm font-medium leading-tight text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit id
            consequatur eius amet et consequuntur.
          </div>
        </div>
        <div className="w-full px-6">
          <img
            src={"/me.jpg"}
            alt="Photo"
            className="object-cover rounded-t-lg h-[200px] max-w-[350px] mx-auto w-full border border-black/20 ring-2 ring-black/80 border-b-0 filter grayscale"
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 border border-gray-300 ring-2 ring-black/80 rounded-lg">
        <div className="w-fit mx-auto relative -left-2 flex items-center gap-2 md:gap-1 text-2xl p-6 pb-0">
          <Sparkle
            className="size-6 md:size-5 relative bottom-[1px]"
            strokeWidth={3}
          />
          <span className="font-black">My Toolbox</span>
        </div>
        <ScrollArea
          className="w-full p-6 pb-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            className="grid grid-rows-4 auto-cols-max gap-3 pb-4 text-white"
            style={{ gridAutoFlow: "column", overflowX: "auto" }}
          >
            <Skill icon={<RiNextjsFill className="size-6" />} name="Next.js" />
            <Skill
              icon={<RiJavascriptFill className="size-6" />}
              name="Javascript"
            />
            <Skill
              icon={<BiLogoTypescript className="size-6" />}
              name="Typescript"
            />
            <Skill icon={<DiPython className="size-6" />} name="Python" />
            <Skill icon={<RiHtml5Fill className="size-6" />} name="HTML" />
            <Skill icon={<RiCss3Fill className="size-6" />} name="CSS" />
            <Skill icon={<BiLogoDjango className="size-6" />} name="Django" />
            <Skill
              icon={<BiLogoPostgresql className="size-6" />}
              name="PostgreSQL"
            />
            <Skill
              icon={<RiReactjsFill className="size-6" />}
              name="React.js"
            />
            <Skill
              icon={<RiTailwindCssFill className="size-6" />}
              name="TailwindCSS"
            />
            <Skill icon={<FaGolang className="size-6" />} name="Golang" />
            <Skill icon={<SiShadcnui className="size-6" />} name="ShadcnUI" />
            <Skill
              icon={<AiFillApi className="size-6" />}
              name="AI Integration"
            />
            <Skill
              icon={<SiFastapi className="size-5 mr-1" />}
              name="FastAPI"
            />
            <Skill
              icon={<TbApi className="size-6" />}
              name="RESTful APIs"
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
