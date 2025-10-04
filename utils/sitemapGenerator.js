import fs from "fs";
import path from "path";
import sitemapConfig from "../config/sitemap.config";

class SitemapGenerator {
  constructor() {
    this.siteUrl = sitemapConfig.siteUrl;
    this.urls = new Set();
  }

  formatDate(date) {
    return date.toISOString().replace(/\.\d+Z$/, "+00:00");
  }

  addUrl(url, priority) {
    // Remove trailing slashes and ensure URL starts with /
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    const finalUrl = cleanUrl.replace(/\/$/, "");

    const urlEntry = `<url>
  <loc>${this.siteUrl}${finalUrl}</loc>
  <lastmod>${this.formatDate(new Date())}</lastmod>
  <priority>${priority.toFixed(2)}</priority>
</url>`;
    this.urls.add(urlEntry);
  }

  async addStaticRoutes() {
    // Add main static routes
    const staticRoutes = [
      { url: "/", priority: 1.0 },
      { url: "/blogs", priority: 0.8 },
      { url: "/builders", priority: 0.8 },
      { url: "/pre-construction-homes", priority: 0.8 },
      { url: "/top-10-gta-projects", priority: 0.8 },
    ];

    staticRoutes.forEach((route) => {
      this.addUrl(route.url, route.priority);
    });
  }

  async addDynamicRoutes() {
    try {
      // Fetch all preconstruction projects
      const response = await fetch(
        "https://api.condomonk.ca/api/all-precons/",
        {
          next: { revalidate: 10 },
        }
      );
      const data = await response.json();

      // Price range filters
      const priceRanges = [
        "under-500k",
        "under-600k",
        "under-700k",
        "under-800k",
        "under-1-million",
        "under-1.5-million",
      ];

      // Add URLs for each city and its projects
      data.forEach((city) => {
        // Add city URL with priority 1.0 (changed from 0.8)
        this.addUrl(`/${city.slug}`, 1.0);

        // Add price range URLs for each city
        priceRanges.forEach((priceRange) => {
          this.addUrl(`/${city.slug}-homes-${priceRange}`, 0.7);
        });

        // Add URLs for each project in the city
        city.preconstructions.forEach((project) => {
          this.addUrl(`/${city.slug}/${project.slug}`, 0.64);
        });
      });

      // Keep all existing routes
      await this.addBuilderRoutes();
      await this.addBlogRoutes();
      await this.addNewHomesRoutes();
      await this.addTopProjectsRoutes();
    } catch (error) {
      console.error("Error fetching preconstruction data:", error);
    }
  }

  async addBuilderRoutes() {
    try {
      // Fetch builders from API
      const response = await fetch("https://api.condomonk.ca/api/developers", {
        next: { revalidate: 10 },
      });
      const data = await response.json();

      // Add URL for each builder
      if (data.developers) {
        data.developers.forEach((builder) => {
          this.addUrl(`/builders/${builder.slug}`, 0.6);
        });
      }
    } catch (error) {
      console.error("Error fetching builders:", error);
    }
  }

  async addBlogRoutes() {
    try {
      // Fetch blogs from API
      const response = await fetch("https://api.condomonk.ca/api/news/", {
        next: { revalidate: 10 },
      });
      const data = await response.json();

      // Add URL for each blog post
      if (Array.isArray(data)) {
        data.forEach((blog) => {
          this.addUrl(`/blogs/${blog.slug}`, 0.6);
        });
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  async addNewHomesRoutes() {
    // Implementation for adding new homes routes
  }

  async addTopProjectsRoutes() {
    // Implementation for adding top projects routes
  }

  generateSitemapXml() {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->

`;
    const xmlFooter = "</urlset>";

    // Join URLs with newlines and proper spacing
    const urlsContent = Array.from(this.urls).join("\n");

    return xmlHeader + urlsContent + "\n" + xmlFooter;
  }

  async generateSitemap() {
    try {
      // Clear existing URLs
      this.urls.clear();

      // Add routes
      await this.addStaticRoutes();
      await this.addDynamicRoutes();

      // Generate XML
      const sitemapXml = this.generateSitemapXml();

      // Write to file
      const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
      fs.writeFileSync(outputPath, sitemapXml);

      return {
        success: true,
        message: "Sitemap generated successfully",
        path: "/sitemap.xml",
      };
    } catch (error) {
      console.error("Error generating sitemap:", error);
      return {
        success: false,
        message: "Error generating sitemap",
        error: error.message,
      };
    }
  }
}

export default new SitemapGenerator();
