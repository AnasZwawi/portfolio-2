import fs from 'fs/promises';
import path from 'path';

const POSTS_PATH = path.join(process.cwd(), 'content/posts');

export async function generateStaticParams() {
  // Read the filenames from the posts directory
  const filenames = await fs.readdir(POSTS_PATH);

  // Map filenames to slug-based paths
  return filenames.map((filename) => ({
    slug: filename.replace('.mdx', ''), // Remove file extension
  }));
}
