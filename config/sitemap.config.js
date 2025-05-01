const sitemapConfig = {
  siteUrl: "https://condomonk.ca",

  // Static routes with their priorities
  staticRoutes: [
    {
      url: "/",
      priority: 1.0,
    },
    {
      url: "/ajax",
      priority: 0.8,
    },
    {
      url: "/aurora",
      priority: 0.8,
    },
  ],

  // Dynamic route patterns and their configurations
  dynamicRoutes: [
    {
      pattern: "/[city]",
      priority: 0.8,
    },
    {
      pattern: "/[city]/[slug]",
      priority: 0.64,
    },
    {
      pattern: "/[city]/[propertyType]",
      priority: 0.8,
    },
    {
      pattern: "/[city]/[development]",
      priority: 0.64,
    },
  ],

  // API endpoints that provide dynamic content
  contentAPIs: [
    {
      endpoint: "/api/cities",
      type: "cities",
    },
    {
      endpoint: "/api/developments",
      type: "developments",
    },
  ],

  // General settings
  defaultPriority: 0.5,
  outputPath: "./public/sitemap.xml",
};

export default sitemapConfig;
