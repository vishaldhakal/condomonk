module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.condomonk.ca",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = "static/chunks/[name].[contenthash:8].js";
      config.output.publicPath = "/_next/";
    }
    return config;
  },
};
