// utils/fetchPostData.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter"
import {GrayMatterFile} from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Client } from "pg";

// Define the path to the posts
const POSTS_PATH = path.join(process.cwd(), "content/posts");

// Initialize PostgreSQL client to connect to Neon
const client = new Client({
  connectionString: process.env.NEON_DB_URL, // Use the Vercel environment variable for the Neon connection string
});

client.connect();

// Function to fetch likes data from the Neon database
const fetchLikesData = async (slug: string) => {
  try {
    // Query the database for likes data for the specific post
    const result = await client.query(
      `SELECT likes FROM likes WHERE slug = $1`,
      [slug]
    );

    if (result.rows.length > 0) {
      return result.rows[0].likes; // Return the likes count
    }

    // If no likes data exists, return 0
    return 0;
  } catch (error) {
    console.error("Error fetching likes data:", error);
    return 0; // Default to 0 if there's an error
  }
};

interface FrontMatter {
  title: string;
  author: string;
  authorPhoto: string;
  date: string;
  coverPhoto: string;
  description: string;
  categories?: string[];
  slug: string;
}

interface PostCacheEntry {
  frontMatter: FrontMatter;
  serializedContent: MDXRemoteSerializeResult;
  initialLikes: number;
  timestamp: number;
}

// Cache expiration time (1 hour)
const cacheExpirationTime = 60 * 60 * 1000; // 1 hour in milliseconds

// Define the type for the postCache
const postCache: { [slug: string]: PostCacheEntry } = {};

// Function to fetch the post data
export async function fetchPostData(slug: string): Promise<{
  frontMatter: FrontMatter;
  serializedContent: MDXRemoteSerializeResult;
  initialLikes: number;
}> {
  const currentTime = Date.now();

  // Check if the post is cached and valid
  if (
    postCache[slug] &&
    currentTime - postCache[slug].timestamp < cacheExpirationTime
  ) {
    // Return the cached data if it is still valid
    return {
      frontMatter: postCache[slug].frontMatter,
      serializedContent: postCache[slug].serializedContent,
      initialLikes: postCache[slug].initialLikes,
    };
  }

  // Fetch the post data if it's not cached or cache has expired
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Cast the result of matter to ensure correct type for frontMatter
  const { data: frontMatter, content } = matter(fileContents) as GrayMatterFile<string>;
  
  // Narrow the type of frontMatter to FrontMatter
  const typedFrontMatter = frontMatter as FrontMatter;

  const serializedContent = await serialize(content);
  const initialLikes = await fetchLikesData(slug);

  // Cache the post data with a timestamp
  postCache[slug] = {
    frontMatter: typedFrontMatter,
    serializedContent,
    initialLikes,
    timestamp: currentTime,
  };

  return { frontMatter: typedFrontMatter, serializedContent, initialLikes };
}

export async function fetchLikesPerPost(slug: string) {

  // Fetch likes data from the Neon database
  const initialLikes = await fetchLikesData(slug); // Use async function to fetch likes

  return { initialLikes };
}
