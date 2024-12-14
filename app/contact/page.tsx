"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Sparkle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [particles] = useState(
    Array.from({ length: 200 }, () => {
      const size = Math.random() * 4 + 1; // Random size between 1 and 5
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        delay: Math.random() * 2, // Delay between 0 and 2 seconds
        duration: Math.random() * 4 + 2, // Duration between 2 and 6 seconds
        opacity: size / 5, // Smaller size = less opacity
      };
    })
  );

  return (
    <div className="w-full h-screen flex">
      {/* Animated Particle Section */}
      <div className="h-full w-[40%] bg-black relative overflow-hidden">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full animate-[float_ease-in-out_infinite]"
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: "translate(-50%, -50%)",
              opacity: particle.opacity, // Apply dynamic opacity
            }}
          ></div>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="w-full md:w-[60%] h-full flex items-center justify-center relative">
        <Link href={"/"} className="absolute top-8 cursor-pointer shadow-lg hover:scale-[1.05] hover:bg-black hover:text-white duration-150 left-8 rounded-lg border border-gray-300 ring-2 ring-black/80 p-[10px]">
          <ArrowLeft className="" />
        </Link>
        <div className="w-[600px] h-fit">
          <div className="p-6">
            <div className="w-fit mx-auto flex items-center gap-2 text-3xl">
              <Sparkle
                className="size-6 md:size-7 relative bottom-[1px]"
                strokeWidth={3}
              />
              <span className="font-black">Contact Me</span>
            </div>
          </div>
          <form
            className="p-6 pt-0 gap-6"
            action="https://getform.io/f/bqooygxb"
            method="post"
          >
            <div className="flex flex-col sm:flex-row gap-6">
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
              className="border-2 rounded-lg border-black/80 shadow my-6 max-h-[150px]"
              name="message"
              required
            />
            <Button className="text-[15px] px-5 py-[21px] rounded-lg w-full">
              Send Message
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
