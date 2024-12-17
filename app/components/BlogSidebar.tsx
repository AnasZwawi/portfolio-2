import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import LikeButton from "./LikeButton";

export const BlogSidebar = ({
  slug,
  initialLikes,
}: {
  slug: string;
  initialLikes: number;
}) => {
  return (
    <div className="w-full md:w-fit fixed left-0 p-4 bottom-0 md:top-[3.2rem] md:bottom-auto backdrop-blur-md  bg-white/40 md:backdrop-blur-none md:bg-transparent  md:left-4 md:border-none">
      <div className="flex md:flex-col gap-4 justify-between items-center md:items-start">
        <Link
          href={"/blog"}
          className="cursor-pointer shadow-lg hover:scale-[1.05] relative -top-[1px] hover:bg-black hover:text-white duration-150 rounded-full border border-gray-300 ring-2 ring-black/80 p-[3px]"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <LikeButton slug={slug} initialLikes={initialLikes} />
      </div>
    </div>
  );
};
