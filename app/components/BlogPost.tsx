// components/BlogPost.tsx (Client-Side)
"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

interface BlogPostProps {
  serializedContent: MDXRemoteSerializeResult;
}

const BlogPost: React.FC<BlogPostProps> = ({ serializedContent }) => {
  return (
    <div>
      <MDXRemote {...serializedContent} />
    </div>
  );
};

export default BlogPost;
