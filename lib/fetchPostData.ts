// utils/fetchPostData.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

// Define the path to the posts
const POSTS_PATH = path.join(process.cwd(), "content/posts");

// Function to fetch likes data from a JSON file
const fetchLikesData = () => {
  try {
    const fileContents = fs.readFileSync(path.join(process.cwd(), "data", "likes.json"), "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    return {error}; // Return an empty object if no likes file is found
  }
};

// Fetch post data
export async function fetchPostData(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse the frontmatter and content using gray-matter
  const { data: frontMatter, content } = matter(fileContents);

  // Serialize the MDX content
  const serializedContent = await serialize(content);

  // Fetch likes data from the JSON file
  const likesData = fetchLikesData();
  const initialLikes = likesData[slug]?.likes || 0; // Default to 0 if no likes data exists for this post

  return { frontMatter, serializedContent, initialLikes };
}
