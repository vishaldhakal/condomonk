import fs from "fs";
import path from "path";
import sitemapConfig from "../config/sitemap.config.js";

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

    const urlEntry = `  <url>
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
      { url: "/resale", priority: 0.8 },
      { url: "/top-10-gta-projects", priority: 0.8 },
      { url: "/contact", priority: 0.7 },
      { url: "/about", priority: 0.7 },
      { url: "/privacy-policy", priority: 0.5 },
      { url: "/terms-of-service", priority: 0.5 },
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

      if (!response.ok) {
        throw new Error(`Failed to fetch precons: ${response.status}`);
      }

      const data = await response.json();

      // Add URLs for each city and its projects
      data.forEach((city) => {
        // Add city URL
        this.addUrl(`/${city.slug}`, 0.8);

        // Add URLs for each project in the city
        if (city.preconstructions) {
          city.preconstructions.forEach((project) => {
            this.addUrl(`/${city.slug}/${project.slug}`, 0.64);
          });
        }
      });
    } catch (error) {
      console.error("Error fetching preconstruction data:", error);
    }
  }

  async addBuilderRoutes() {
    try {
      const response = await fetch("https://api.condomonk.ca/api/developers", {
        next: { revalidate: 10 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch builders: ${response.status}`);
      }

      const data = await response.json();

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
      const response = await fetch("https://api.condomonk.ca/api/blogs", {
        next: { revalidate: 10 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status}`);
      }

      const data = await response.json();

      if (data.blogs) {
        data.blogs.forEach((blog) => {
          this.addUrl(`/blogs/${blog.slug}`, 0.6);
        });
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  generateSitemapXml() {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
    const xmlFooter = "\n</urlset>";

    // Sort URLs for better organization and consistency
    const sortedUrls = Array.from(this.urls).sort();
    return xmlHeader + "\n" + sortedUrls.join("\n") + xmlFooter;
  }

  async generateSitemap() {
    try {
      // Clear existing URLs
      this.urls.clear();

      // Add all routes
      await this.addStaticRoutes();
      await this.addDynamicRoutes();
      await this.addBuilderRoutes();
      await this.addBlogRoutes();

      // Generate XML
      const sitemapXml = this.generateSitemapXml();

      // Write to file
      const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
      fs.writeFileSync(outputPath, sitemapXml);

      return {
        success: true,
        message: `Sitemap generated successfully with ${this.urls.size} URLs`,
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
