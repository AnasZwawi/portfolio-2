// utils/fetchPostData.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
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

// Fetch post data
export async function fetchPostData(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse the frontmatter and content using gray-matter
  const { data: frontMatter, content } = matter(fileContents);

  // Serialize the MDX content
  const serializedContent = await serialize(content);

  // Fetch likes data from the Neon database
  // Use async function to fetch likes

  return { frontMatter, serializedContent };
}

export async function fetchLikesPerPost(slug: string) {

  // Fetch likes data from the Neon database
  const initialLikes = await fetchLikesData(slug); // Use async function to fetch likes

  return { initialLikes };
}
