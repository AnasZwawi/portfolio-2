"use client";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function LikeButton({ slug, initialLikes }: { slug: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false); // To track if the post is liked or not

  const handleLikeDislike = async () => {
    // Determine the action based on the current state (like or dislike)
    const action = isLiked ? "dislike" : "like";

    // Send the updated like count to the server
    const response = await fetch(`/api/likes/${slug}`, {
      method: "POST",
      body: JSON.stringify({ action }), // Send the action (like or dislike)
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setLikes(data.likes); // Update the likes state
      setIsLiked(!isLiked); // Toggle the like state (like/dislike)
    }
  };

  return (
    <button onClick={handleLikeDislike} className="">
      {isLiked ? (<div className="flex items-center font-medium gap-1">
        <Heart fill="black"/>{likes}</div>
      ):(<div className="flex items-center font-medium opacity-80 gap-1"><Heart className="hover:fill-black"/>{likes}</div>)}
    </button>
  );
}
