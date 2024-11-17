/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.condomonk.ca", "condomonk.ca"],
  },
  webpack: (config, { isServer }) => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
    }
    return config;
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
