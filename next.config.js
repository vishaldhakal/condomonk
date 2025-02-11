/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add any other necessary configurations
};

module.exports = {
  images: {
    domains: ["api.condomonk.ca", "trreb-image.ampre.ca"],
  },
};
