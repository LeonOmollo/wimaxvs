/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "via.placeholder.com",
      "localhost:3000",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
