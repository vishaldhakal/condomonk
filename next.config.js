/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add any other necessary configurations
  images: {
    domains: ["api.condomonk.ca", "trreb-image.ampre.ca", "api.toassign.com"],
  },
};

module.exports = nextConfig;
