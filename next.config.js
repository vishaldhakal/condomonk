module.exports = {
  images: {
    domains: ["api.condomonk.ca"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = "static/chunks/[name].[contenthash:8].js";
      config.output.publicPath = "/_next/";
    }
    return config;
  },
};
