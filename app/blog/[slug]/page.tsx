import { fetchPostData } from "@/lib/fetchPostData";
import dynamic from "next/dynamic";
import { BlogSidebar } from "@/app/components/BlogSidebar";
import Link from "next/link";
import { RiGithubFill, RiInstagramFill, RiTwitterXFill } from "react-icons/ri";
import { Karla } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { memo } from "react";
import { LazyLoadImageBlogPost } from "@/app/components/LazyLoader";

const karla = Karla({ subsets: ["latin"] });

// Dynamically import the client-side MDX component (already optimized)
const BlogPost = dynamic(() => import("@/app/components/BlogPost"), {
  ssr: false,
});

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch the post data (frontmatter, content) and likes from the server
  const { frontMatter, serializedContent, initialLikes } = await fetchPostData(
    slug
  );

  return (
    <>
      <div className="w-[93%] mx-auto md:max-w-[750px] mb-[6rem]">
        <div className="mt-[4rem]">
          <article>
            <div className="flex justify-between">
              <div className="flex items-center gap-1 mb-4">
                {/* Use Next.js Image for optimized loading */}
                <Image
                  src={frontMatter.authorPhoto}
                  className="size-8 rounded-full"
                  alt={frontMatter.author}
                  height={32}
                  width={32}
                  priority={false}
                />
                <div className="leading-none">
                  <p className="font-medium">{frontMatter.author}</p>
                  <p className="text-xs">{frontMatter.date}</p>
                </div>
              </div>

              {/* Memoize Social Links to avoid unnecessary re-renders */}
              <SocialLinks />
            </div>

            <div className="h-fit relative rounded-xl overflow-clip">
              {/* Use Next.js Image for optimized lazy loading */}
              <LazyLoadImageBlogPost
                src={frontMatter.coverPhoto}
                alt={frontMatter.title}
                height={340}
                width={750}
              />

              <div className="absolute text-white bg-gradient-to-b from-black via-black/70 to-transparent p-6 pt-5 pb-14 w-full top-0">
                <h1 className="text-xl md:text-[28px] font-medium">
                  {frontMatter.title}
                </h1>
                <h1 className="md:text-lg font-medium mt-2">
                  {frontMatter.description}
                </h1>
              </div>
            </div>

            {/* Render categories if they exist */}
            {frontMatter.categories &&
              Array.isArray(frontMatter.categories) && (
                <div className="mt-4">
                  <ul className="flex space-x-3">
                    {frontMatter.categories.map((category, index) => (
                      <li
                        key={index}
                        className="bg-gray-200 px-3 py-1 rounded-full font-medium text-sm"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Render the Like button */}
            <BlogSidebar slug={frontMatter.slug} initialLikes={initialLikes} />

            {/* Render the serialized MDX content */}
            <Separator className="mt-8 bg-black/80 h-[2px] rounded-full" />
            <div className={`${karla.className} mt-8`}>
              <BlogPost serializedContent={serializedContent} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

const SocialLinks = memo(() => (
  <nav className="flex gap-x-2 relative top-1">
    <Link href={"https://github.com/AnasZwawi"} target="_blank">
      <RiGithubFill className="size-6" />
    </Link>
    <Link href={"https://x.com/AnasZwawi17"} target="_blank">
      <RiTwitterXFill className="size-6" />
    </Link>
    <Link href={"https://www.instagram.com/anas.zwawi"} target="_blank">
      <RiInstagramFill className="size-6" />
    </Link>
  </nav>
));

// Add displayName to resolve the ESLint error
SocialLinks.displayName = "SocialLinks";

export { SocialLinks };
