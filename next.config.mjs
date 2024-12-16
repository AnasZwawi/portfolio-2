import mdx from '@next/mdx';

/** @type {import('next').NextConfig} */
const withMDX = mdx({
  extension: /\.mdx$/,
});

const nextConfig = withMDX({
  pageExtensions: ['ts', 'tsx', 'mdx'], // Add support for .mdx files
});

export default nextConfig;
