/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["flagcdn.com"],
  },
};

module.exports = nextConfig;
