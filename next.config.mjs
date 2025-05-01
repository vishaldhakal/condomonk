/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.condomonk.ca",
      },
      {
        protocol: "https",
        hostname: "api.toassign.com",
      },
      {
        protocol: "https",
        hostname: "trreb-image.ampre.ca",
      },
    ],
  },
};

export default nextConfig;
