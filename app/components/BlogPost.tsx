// components/BlogPost.tsx (Client-Side)
"use client";

import { MDXRemote } from "next-mdx-remote";
import React from "react";

interface BlogPostProps {
  serializedContent: any; // Define the type for serialized content
}

const BlogPost: React.FC<BlogPostProps> = ({ serializedContent }) => {
  return (
    <div>
      <MDXRemote {...serializedContent} />
    </div>
  );
};

export default BlogPost;
