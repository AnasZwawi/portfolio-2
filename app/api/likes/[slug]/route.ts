import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the file path where likes data is stored
const getLikesFilePath = () => path.join(process.cwd(), "data", "likes.json");

// Fetch the likes data from a JSON file
const fetchLikesData = () => {
  const filePath = getLikesFilePath();
  try {
    // Create the file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({})); // Create an empty file
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading likes data:", error);
    return {}; // Return an empty object if no likes file is found
  }
};

// Update the likes data in the JSON file
const updateLikesData = (slug: string, likes: number) => {
  const likesData = fetchLikesData();
  likesData[slug] = { likes };

  fs.writeFileSync(getLikesFilePath(), JSON.stringify(likesData, null, 2));
  return likesData;
};

// Handle GET and POST requests for likes
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  // Make sure the slug exists
  if (!slug) {
    return NextResponse.json({ error: "Slug is missing" }, { status: 400 });
  }

  const likesData = fetchLikesData();
  const initialLikes = likesData[slug]?.likes || 0; // Default to 0 if no likes data exists for this post
  return NextResponse.json({ likes: initialLikes });
}

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
  const likesData = fetchLikesData();
  const currentLikes = likesData[slug]?.likes || 0;

  // Update likes based on the action
  const updatedLikes = action === "like" ? currentLikes + 1 : currentLikes - 1;

  // Update the likes data and write it back to the JSON file
  const updatedData = updateLikesData(slug, updatedLikes);

  return NextResponse.json({ likes: updatedData[slug].likes });
}
