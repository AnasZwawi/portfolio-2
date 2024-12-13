import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkle } from "lucide-react";
import Link from "next/link";
import React from "react";

export const AboutSectionTwo = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <div
        id="contact"
        className="w-full md:w-2/3 border border-gray-300 ring-2 ring-black/80 rounded-lg"
      >
        <div className="p-6">
          <div className="w-fit mx-auto relative -left-2 flex items-center gap-2 md:gap-1 text-2xl">
            <Sparkle
              className="size-6 md:size-5 relative bottom-[1px]"
              strokeWidth={3}
            />{" "}
            <span className="font-black">Contact Me</span>
          </div>
        </div>
        <form
          className="p-6 pt-0"
          action="https://getform.io/f/bqooygxb"
          method="post"
        >
          <div className="flex gap-4">
            <Input
              placeholder="Full Name"
              className="border-2 rounded-lg border-black/80 shadow"
              name="name"
              type="text"
              required
            />
            <Input
              placeholder="Email"
              className="border-2 rounded-lg border-black/80 shadow"
              name="email"
              type="email"
              required
            />
          </div>
          <Textarea
            placeholder="Your Message"
            className="border-2 rounded-lg border-black/80 shadow mt-4 max-h-[150px]"
            name="message"
            required
          />
          <Button className="mt-4 text-[15px] px-5 py-[21px] rounded-lg w-full"> Send Message<Send/></Button>
        </form>
      </div>
      <Link href={"https://maps.app.goo.gl/w5qmsUzfLmgdTHy28"} target="_" className="w-full md:w-1/3 border overflow-hidden relative border-gray-300 ring-2 ring-black/80 rounded-lg">

        <img src="/place.png" className="w-full h-full object-cover" alt="" />
        <img src="/me.jpg" className="size-16 animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 filter grayscale border-white ring-2 ring-black" alt="" />
      </Link>
    </div>
  );
};
