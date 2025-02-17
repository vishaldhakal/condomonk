const sitemapConfig = {
  siteUrl: 'https://condomonk.ca',
  
  // Static routes with their priorities
  staticRoutes: [
    {
      url: '/',
      priority: 1.00
    },
    {
      url: '/ajax',
      priority: 0.80
    },
    {
      url: '/aurora',
      priority: 0.80
    }
  ],

  // Dynamic route patterns and their configurations
  dynamicRoutes: [
    {
      pattern: '/[city]',
      priority: 0.80
    },
    {
      pattern: '/[city]/[propertyType]',
      priority: 0.80
    },
    {
      pattern: '/[city]/[development]',
      priority: 0.64
    }
  ],

  // API endpoints that provide dynamic content
  contentAPIs: [
    {
      endpoint: '/api/cities',
      type: 'cities'
    },
    {
      endpoint: '/api/developments',
      type: 'developments'
    }
  ],

  // General settings
  defaultPriority: 0.50,
  outputPath: './public/sitemap.xml'
};

module.exports = sitemapConfig;
