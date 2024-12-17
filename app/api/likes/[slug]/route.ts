import { NextResponse } from "next/server";
import { Client } from "pg";

// Initialize PostgreSQL client to connect to Neon
const client = new Client({
  connectionString: process.env.NEON_DB_URL, // Use your Neon database URL
});

client.connect();

// Fetch likes data from Neon database
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

// Update likes data in Neon database
const updateLikesData = async (slug: string, likes: number) => {
  try {
    // Insert or update the likes count for the post in the database
    const result = await client.query(
      `INSERT INTO likes (slug, likes) VALUES ($1, $2) 
      ON CONFLICT (slug) 
      DO UPDATE SET likes = $2 RETURNING likes`,
      [slug, likes]
    );

    return result.rows[0].likes; // Return the updated likes count
  } catch (error) {
    console.error("Error updating likes data:", error);
    return likes; // Return the current likes if there's an error
  }
};

// Handle GET requests for likes
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  // Make sure the slug exists
  if (!slug) {
    return NextResponse.json({ error: "Slug is missing" }, { status: 400 });
  }

  // Fetch likes data from the Neon database
  const initialLikes = await fetchLikesData(slug);
  return NextResponse.json({ likes: initialLikes });
}

// Handle POST requests to update likes
export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  // Ensure the slug is defined
  if (!slug) {
    return NextResponse.json({ error: "Slug is missing" }, { status: 400 });
  }

  // Get the request body (like or dislike action)
  const { action } = await req.json();

  if (action !== "like" && action !== "dislike") {
    return NextResponse.json({ error: "Invalid action, must be 'like' or 'dislike'" }, { status: 400 });
  }

  // Fetch the current likes data
  const currentLikes = await fetchLikesData(slug);

  // Update likes based on the action
  const updatedLikes = action === "like" ? currentLikes + 1 : currentLikes - 1;

  // Update the likes data in the Neon database
  const updatedLikesCount = await updateLikesData(slug, updatedLikes);

  return NextResponse.json({ likes: updatedLikesCount });
}
