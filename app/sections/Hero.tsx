import { Button } from "@/components/ui/button";
import { ArrowDown, Icon } from "lucide-react";
import React from "react";
import { starNorth } from "@lucide/lab";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="w-full mt-[4rem] md:mt-[8rem] flex flex-col justify-center relative overflow-x-clip ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto w-[1000px] h-[1000px] rounded-full border border-black/50">
        <Icon
          iconNode={starNorth}
          className="absolute left-4 top-2/3 text-gray-500 animate-spin-slow"
          size={40}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto w-[800px] h-[800px] rounded-full border border-black/30">
        <Icon
          iconNode={starNorth}
          className="absolute right-3 bottom-2/3 text-gray-400 animate-spin-slow"
          size={36}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto w-[600px] h-[600px] rounded-full border border-black/20">
        <Icon
          iconNode={starNorth}
          className="absolute left-[6px] bottom-2/3 text-gray-300 animate-spin-slow"
          size={32}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto w-[400px] h-[400px] rounded-full border border-black/10">
        <Icon
          iconNode={starNorth}
          className="absolute right-9 top-[80%] text-gray-200 animate-spin-slow"
          size={28}
        />
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/me.jpg"
          alt="Photo"
          className="rounded-lg relative top-[1.4rem] z-30 filter grayscale"
          width={150}
          height={150}
        />
        <div className="rounded-lg inline-flex items-center gap-[8px] bg-black text-white px-4 py-2 z-40 w-fit mx-auto">
          <div className="bg-green-500 h-[11px] w-[11px] rounded-full relative">
            <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
          </div>
          <span className="text-sm">Available for new projects</span>
        </div>
      </div>
      <div className="mt-8 flex z-40 flex-col items-center gap-5 leading-[3rem] text-center max-w-[700px] mx-auto">
        <h1 className="font-black uppercase text-[32px] md:text-[48px] drop-shadow-md px-1">
          Creating Outstanding Digital Experiences
        </h1>
        <p className="text-lg font-medium">
          I turn ideas into smooth, responsive, and powerful web applications.
          Let’s work together to create something incredible!
        </p>
        <div className="flex space-x-4 mt-3">
          <Button className="px-[22px] py-6 text-[15px] gap-1 rounded-lg ">
            Explore My Work <ArrowDown />
          </Button>
          <Button className="pl-5 rounded-lg pr-7 py-6 text-[15px]">
            <span className="text-lg">👋</span>Let&apos;s Connect
          </Button>
        </div>
      </div>
    </div>
  );
};
