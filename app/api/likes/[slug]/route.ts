"use server"
import { NextResponse } from "next/server";
import { Pool } from "pg";

// Initialize a connection pool
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL, // Use your Neon database URL
});

// Fetch likes data from Neon database
const fetchLikesData = async (slug: string) => {
  try {
    const client = await pool.connect(); // Get a client from the pool
    const result = await client.query(`SELECT likes FROM likes WHERE slug = $1`, [slug]);
    client.release(); // Release the client back to the pool
    console.log(result.rows[0].likes)
    console.log("hello")
    return result.rows.length > 0 ? result.rows[0].likes : 0;
  } catch (error) {
    console.error("Error fetching likes data:", error);
    return 0; // Default to 0 if there's an error
  }
};

// Update likes data in Neon database
const updateLikesData = async (slug: string, likes: number) => {
  try {
    const client = await pool.connect(); // Get a client from the pool
    const result = await client.query(
      `INSERT INTO likes (slug, likes) VALUES ($1, $2) 
      ON CONFLICT (slug) 
      DO UPDATE SET likes = $2 RETURNING likes`,
      [slug, likes]
    );
    client.release(); // Release the client back to the pool

    return result.rows[0].likes;
  } catch (error) {
    console.error("Error updating likes data:", error);
    return likes;
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
