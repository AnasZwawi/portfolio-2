"use client";
import { useState } from "react"; // Import useState
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN Skeleton
export const LazyLoadImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Skeleton className="w-full h-[250px] rounded-xl" />}
      <div>
        <Image
          src={src}
          alt={alt}
          className={`w-full rounded-xl object-cover h-[250px] transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          height={250}
          width={400}
          priority={false}
          onLoadingComplete={() => setIsLoaded(true)} // Handle image load completion
        />
      </div>
    </>
  );
};
LazyLoadImage.displayName = "LazyLoadImage";

export const LazyLoadImageBlogPost = ({
  src,
  alt,
  height,
  width,
}: {
  src: string;
  alt: string;
  height: number;
  width: number;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Skeleton className="w-full h-[340px] rounded-xl" />}
      <Image
        src={src}
        alt={alt}
        className={`w-full rounded-xl object-cover h-[340px] transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        height={height}
        width={width}
        objectFit="cover"
        loading="lazy" // Enable lazy loading for the image
        onLoadingComplete={() => setIsLoaded(true)} // Set loaded state to true when the image is loaded
      />
    </>
  );
};
LazyLoadImageBlogPost.displayName = "LazyLoadImageBlogPost";

