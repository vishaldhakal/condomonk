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
      { url: "/new-homes", priority: 0.8 },
      { url: "/pre-construction-homes", priority: 0.8 },
      { url: "/resale", priority: 0.8 },
      { url: "/top-10-gta-projects", priority: 0.8 },
    ];

    staticRoutes.forEach((route) => {
      this.addUrl(route.url, route.priority);
    });
  }

  async addDynamicRoutes() {
    try {
      // All cities
      const cities = [
        "ajax",
        "aurora",
        "barrie",
        "baxter",
        "bolton",
        "bradford",
        "brampton",
        "brantford",
        "burlington",
        "burnaby",
        "caledon",
        "calgary",
        "cambridge",
        "east-gwillimbury",
        "etobicoke",
        "georgetown",
        "grimsby",
        "guelph",
        "hamilton",
        "innisfil",
        "kingston",
        "kitchener",
        "maple",
        "markham",
        "milton",
        "mississauga",
        "newmarket",
        "niagara-falls",
        "north-york",
        "oakville",
        "orangeville",
        "oshawa",
        "pickering",
        "richmond-hill",
        "scarborough",
        "st-catharines",
        "stoney-creek",
        "toronto",
        "unionville",
        "vaughan",
        "waterdown",
        "waterloo",
        "whitby",
        "woodbridge",
      ];

      // Property types from FilterBar
      const propertyTypes = [
        { label: "Detached", path: "detached-homes" },
        { label: "Semi-Detached", path: "semi-detached-homes" },
        { label: "Townhouse", path: "townhouses" },
        { label: "Condo Townhouse", path: "condo-townhouses" },
        { label: "Condos", path: "condos" },
      ];

      // Transaction types
      const transactionTypes = ["for-sale", "for-lease"];

      // Add base resale routes
      this.addUrl("/resale", 0.8);
      this.addUrl("/resale/ontario", 0.8);

      // Add city-specific routes
      cities.forEach((city) => {
        // Add base city route
        this.addUrl(`/${city}`, 0.8);

        // Add city/slug routes by fetching from API
        this.addCityProjectRoutes(city);
      });

      // Generate all possible combinations for each city
      cities.forEach((city) => {
        const cityBase = `/resale/ontario/${city}`;

        // Add transaction type variations
        transactionTypes.forEach((transType) => {
          const transBase = `${cityBase}/homes-${transType}`;
          this.addUrl(transBase, 0.7);

          // Add property type variations
          propertyTypes.forEach((propType) => {
            const propBase = `${cityBase}/${propType.path}-${transType}`;
            this.addUrl(propBase, 0.7);
          });
        });
      });

      // Add Ontario-wide combinations (without city)
      const ontarioBase = "/resale/ontario";

      transactionTypes.forEach((transType) => {
        const transBase = `${ontarioBase}/homes-${transType}`;
        this.addUrl(transBase, 0.75);

        propertyTypes.forEach((propType) => {
          const propBase = `${ontarioBase}/${propType.path}-${transType}`;
          this.addUrl(propBase, 0.7);
        });
      });
    } catch (error) {
      console.error("Error adding dynamic routes:", error);
      throw error;
    }
  }

  async addCityProjectRoutes(city) {
    try {
      // Fetch projects for this city from API
      const response = await fetch(
        `https://api.condomonk.ca/api/preconstructions-city/${city}`,
        {
          next: { revalidate: 10 },
        }
      );
      const data = await response.json();

      // Add URL for each project
      if (data.preconstructions) {
        data.preconstructions.forEach((project) => {
          this.addUrl(`/${city}/${project.slug}`, 0.64);
        });
      }
    } catch (error) {
      console.error(`Error fetching projects for ${city}:`, error);
    }
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
