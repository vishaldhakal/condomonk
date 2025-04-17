/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add any other necessary configurations
  remotePatterns: [
    {
      hostname: "api.condomonk.ca",
    },
    {
      hostname: "trreb-image.ampre.ca",
    },
    {
      hostname: "api.toassign.com",
    },
  ],
};

module.exports = nextConfig;
