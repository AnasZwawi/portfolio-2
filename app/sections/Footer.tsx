import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { RiGithubFill, RiInstagramFill, RiTwitterXFill } from "react-icons/ri";

export const Footer = () => {
  return (
    <footer>
      <div className="w-[93%] mx-auto md:max-w-[1000px] mt-4 mb-[5rem] sm:mb-0">
        <Separator className="bg-black"/>
        <div className="flex justify-between py-4">
          <p className="font-medium">&copy; 2024. All rights reserved.</p>
          <nav className="flex gap-x-2">
            <Link href={"https://github.com/AnasZwawi"} target="_">
              <RiGithubFill className="size-6"/>
            </Link>
            <Link href={"https://x.com/AnasZwawi17"} target="_">
              <RiTwitterXFill className="size-6"/>
            </Link>
            <Link href={"https://www.instagram.com/anas.zwawi"} target="_">
              <RiInstagramFill className="size-6"/>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
