// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = "static/chunks/[name].[contenthash:8].js";
      config.output.publicPath = "/_next/";
    }
    return config;
  },
};
