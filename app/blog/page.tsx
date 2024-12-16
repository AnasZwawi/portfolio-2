import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Input } from "@/components/ui/input";
import { addToBrevoList } from "../actions";
import { SubmitEmail } from "../components/SubscribeButton";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import fs from "fs/promises";
import * as mm from "fs";
import path from "path";
import matter from "gray-matter";
import { Heart } from "lucide-react";
import { SubscribeForm } from "../components/SubscribeForm";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

const fetchLikesData = (slug: string) => {
  try {
    const fileContents = mm.readFileSync(
      path.join(process.cwd(), "data", "likes.json"),
      "utf8"
    );
    return JSON.parse(fileContents);
  } catch (error) {
    return {}; // Return an empty object if no likes file is found
  }
};

export default async function BlogPage() {
  const filenames = await fs.readdir(POSTS_PATH);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(POSTS_PATH, filename);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data: frontMatter } = matter(fileContents);

      const slug = filename.replace(".mdx", "");
      const likesData = fetchLikesData(slug);
      const initialLikes = likesData[slug]?.likes || 0; // Fetch likes for each post

      return {
        slug,
        title: frontMatter.title,
        date: frontMatter.date,
        author: frontMatter.author,
        description: frontMatter.description,
        authorPhoto: frontMatter.authorPhoto,
        coverPhoto: frontMatter.coverPhoto,
        initialLikes, // Include the likes data in the post
      };
    })
  );

  return (
    <div>
      <Navbar />
      <Toaster className="bg-black text-white shadow-lg" />
      <div
        id="projects"
        className="w-[93%] mx-auto md:max-w-[1100px] sm:my-[2rem] py-[6rem]"
      >
        <div className="max-w-[600px] mx-auto mb-[4rem]">
          <div className="rounded-lg bg-black uppercase text-white text-sm w-fit mx-auto px-3 py-1">
            BLOG{" "}
          </div>
          <h1 className="text-[28px] md:text-[35px] uppercase font-black text-center mt-2 mb-1">
            Welcome to My Blog!{" "}
          </h1>
          <p className="font-medium text-center">
            Hi, I'm Anas! Welcome to my blog where I share insights, tutorials,
            and tips on web development, full-stack programming, and my journey
            as a developer.
          </p>
          <SubscribeForm/>
        </div>
        <Separator className="mb-[2rem] bg-black h-[2px] rounded-full" />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {posts.map((post) => (
              <div key={post.slug} className="overflow-clip rounded-lg">
                <Link href={`/blog/${post.slug}`} className="">
                  <img
                    src={post.coverPhoto}
                    className="w-full rounded-xl h-[250px] object-cover"
                  />
                  <div>
                    <div className="font-medium flex justify-between mt-3">
                      <p className="text-[15px]">{post.date}</p>
                      <p className="flex items-center text-[13px] gap-[2px]">
                        <Heart className="size-[15px]" fill="black" />
                        <span>{post.initialLikes}</span>
                      </p>
                    </div>
                    <h2 className="text-[19px] font-medium">{post.title}</h2>
                    <p className="line-clamp-2">{post.description}</p>
                    <div className="flex items-center gap-1 mt-3">
                      <img
                        src={post.authorPhoto}
                        className="size-6 rounded-full"
                        alt=""
                      />
                      <p className="font-medium">{post.author}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
