import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Heart } from "lucide-react";
import { SubscribeForm } from "../components/SubscribeForm";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

const fetchLikesData = async (slug: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/likes/${slug}`);
    if (!response.ok) {
      throw new Error(`Error fetching likes for slug: ${slug}`);
    }
    const data = await response.json();
    return data.likes || 0; // Return likes or 0 if no data exists
  } catch (error) {
    console.error("Error fetching likes data:", error);
    return 0; // Default to 0 likes on error
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
      const likesData = await fetchLikesData(slug);
      const initialLikes = likesData; // Fetch likes for each post

      return {
        slug,
        title: frontMatter.title,
        date: frontMatter.date,
        author: frontMatter.author,
        description: frontMatter.description,
        authorPhoto: frontMatter.authorPhoto,
        coverPhoto: frontMatter.coverPhoto,
        initialLikes,
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
            Hi, I&apos;m Anas! Welcome to my blog where I share insights, tutorials,
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
