import { Sparkle } from "lucide-react";
import React, { Fragment } from "react";

const words = [
  "Performant",
  "Accessible",
  "Secure",
  "Interractive",
  "Scalable",
  "Responsive",
  "User Friendly",
  "Maintainable",
  "Search Optemized",
  "Usable",
  "Reliable",
];

export const Tape = () => {
  return (
    <div className="py-16 md:py-24 overflow-x-clip">
      <div className="bg-black -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-4 py-4 pr-4 animate-move-left">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {words.map((word) => (
                  <div key={word} className="inline-flex gap-4 items-center">
                    <span className="text-white font-medium uppercase text-sm">
                      {word}
                    </span>
                    <Sparkle className="size-5 text-white -rotate-2" />
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
