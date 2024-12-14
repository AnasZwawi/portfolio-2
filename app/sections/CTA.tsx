import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CTA = () => {
  return (
    <div className="w-[93%] mx-auto md:max-w-[1000px] my-[4rem] py-[2rem]">
      <div className="bg-black rounded-lg px-8 py-10 md:p-8 text-white flex flex-col md:flex-row justify-between items-center w-full gap-y-5">
        <div className="flex flex-col md:gap-1 gap-y-3 text-center md:text-left">
          <h2 className="text-2xl leading-tight font-semibold">
            Let&apos;s create somthing amazing together!
          </h2>
          <p className="text-white/80">
            Ready to bring your next project to life? Let&apos;s connect and
            discuss how I can help you achieve your goals.
          </p>
        </div>
        <Button
          className="bg-white text-black text-[15px] px-5 py-[19px]"
          variant={"outline"}
        >
          <Link href={"/contact"} className="flex items-center gap-1">
            Contact Me <MoveUpRight strokeWidth={2.5}/>
          </Link>
        </Button>
      </div>
    </div>
  );
};
