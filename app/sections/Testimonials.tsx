"use client";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";

interface Testimonial {
  name: string;
  position: string;
  id: number;
  content: string;
  face_url: string;
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Fetch the data from the external JSON file
    fetch("/data/testimonials.json")
      .then((response) => response.json())
      .then((data) => setTestimonials(data.testimonials))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);
  return (
    <div className="w-[93%] mx-auto md:max-w-[1000px] mt-[6rem]">
      <div className="max-w-[400px] mx-auto mb-[4rem] mt-20">
        <div className="rounded-lg bg-black uppercase text-white text-sm w-fit mx-auto px-3 py-1">
          Happy Clients
        </div>
        <h1 className="text-[28px] md:text-[35px] uppercase leading-tight font-black text-center mt-3 mb-2">
          What Clients Say About Me
        </h1>
        <p className="font-medium text-center">
          Don&apos;t just take my word for it. See what my clients have to say about
          my work.
        </p>
      </div>
      <div className="w-full pb-16 md:pb-24 overflow-x-clip">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-9 py-4 pr-4 animate-move-left [animation-duration:30s] md:[animation-duration:90s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="p-8 border max-w-[300px] md:max-w-[380px] border-gray-300 ring-2 ring-black rounded-lg flex flex-col gap-4 hover:scale-105 duration-300 cursor-default"
                  >
                    <div className="flex gap-4 items-center">
                      <Image
                        src={`/${testimonial.face_url}`}
                        width={53}
                        height={53}
                        className="rounded-full border border-white ring-2 ring-black/80 shadow-md"
                        alt="face"
                      />
                      <div>
                        <p className="font-medium text-[16px]">
                          {testimonial.name}
                        </p>
                        <p className="font-medium text-gray-600 text-sm">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                    <p className="text-[15px] font-medium text-justify">{testimonial.content}</p>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
