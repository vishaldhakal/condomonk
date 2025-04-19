import fs from "fs";
import path from "path";
import sitemapConfig from "../config/sitemap.config";

class SitemapGenerator {
  constructor() {
    this.siteUrl = sitemapConfig.siteUrl;
    this.urls = new Set();
  }

  formatDate(date) {
    return date.toISOString();
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
      { url: "/resale", priority: 0.8 },
      { url: "/top-10-gta-projects", priority: 0.8 },
    ];

    staticRoutes.forEach((route) => {
      this.addUrl(route.url, route.priority);
    });
  }

  async fetchWithTimeout(url, options = {}) {
    const timeout = options.timeout || 10000; // 10 second timeout
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        // Remove revalidation for large responses
        cache: "no-store", // Disable caching completely
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    } finally {
      clearTimeout(id);
    }
  }

  async addDynamicRoutes() {
    try {
      // Fetch all preconstruction projects
      const data = await this.fetchWithTimeout(
        "https://api.condomonk.ca/api/all-precons/"
      );

      if (data) {
        // Add URLs for each city and its projects
        data.forEach((city) => {
          // Add city URL
          this.addUrl(`/${city.slug}`, 0.8);

          // Add URLs for each project in the city
          if (city.preconstructions && Array.isArray(city.preconstructions)) {
            city.preconstructions.forEach((project) => {
              if (project && project.slug) {
                this.addUrl(`/${city.slug}/${project.slug}`, 0.64);
              }
            });
          }
        });
      }

      // Keep all existing routes
      await this.addBuilderRoutes();
      await this.addBlogRoutes();
      await this.addResaleRoutes();
      await this.addNewHomesRoutes();
      await this.addTopProjectsRoutes();
    } catch (error) {
      console.error("Error in addDynamicRoutes:", error);
    }
  }

  async addBuilderRoutes() {
    try {
      const data = await this.fetchWithTimeout(
        "https://api.condomonk.ca/api/developers"
      );

      if (data && data.developers) {
        data.developers.forEach((builder) => {
          if (builder && builder.slug) {
            this.addUrl(`/builders/${builder.slug}`, 0.6);
          }
        });
      }
    } catch (error) {
      console.error("Error in addBuilderRoutes:", error);
    }
  }

  async addBlogRoutes() {
    try {
      const data = await this.fetchWithTimeout(
        "https://api.condomonk.ca/api/blogs"
      );

      if (data && data.blogs) {
        data.blogs.forEach((blog) => {
          if (blog && blog.slug) {
            this.addUrl(`/blogs/${blog.slug}`, 0.6);
          }
        });
      }
    } catch (error) {
      console.error("Error in addBlogRoutes:", error);
    }
  }

  generateSitemapXml() {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
    const xmlFooter = "</urlset>";

    // Join URLs with newlines and proper spacing
    const urlsContent = Array.from(this.urls).join("\n");

    return xmlHeader + "\n" + urlsContent + "\n" + xmlFooter;
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

const sitemapGenerator = new SitemapGenerator();
export default sitemapGenerator;
