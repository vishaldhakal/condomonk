/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add any other necessary configurations
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.condomonk.ca",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trreb-image.ampre.ca",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.toassign.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
