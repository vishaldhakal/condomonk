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

      // Price ranges from FilterBar
      const priceRanges = [
        { path: "homes-under-500k" },
        { path: "homes-between-500k-750k" },
        { path: "homes-between-750k-1000k" },
        { path: "homes-between-1000k-1500k" },
        { path: "homes-over-1500k" },
      ];

      // Bed options from FilterBar
      const bedOptions = [1, 2, 3, 4, 5];

      // Bath options from FilterBar
      const bathOptions = [1, 2, 3, 4];

      // Transaction types
      const transactionTypes = ["for-sale", "for-lease"];

      // Add base resale routes
      this.addUrl("/resale", 0.8);
      this.addUrl("/resale/ontario", 0.8);

      // Generate all possible combinations for each city
      cities.forEach((city) => {
        const cityBase = `/resale/ontario/${city}`;

        // Add base city URL
        this.addUrl(cityBase, 0.8);

        // Add transaction type variations
        transactionTypes.forEach((transType) => {
          const transBase = `${cityBase}/homes-${transType}`;
          this.addUrl(transBase, 0.7);

          // Add property type variations
          propertyTypes.forEach((propType) => {
            const propBase = `${cityBase}/${propType.path}-${transType}`;
            this.addUrl(propBase, 0.7);

            // Add price range variations
            priceRanges.forEach((priceRange) => {
              this.addUrl(`${propBase}/${priceRange.path}`, 0.65);
            });

            // Add bed/bath combinations
            bedOptions.forEach((beds) => {
              this.addUrl(`${propBase}/${beds}-plus-bed`, 0.65);

              bathOptions.forEach((baths) => {
                this.addUrl(
                  `${propBase}/${beds}-plus-bed/${baths}-plus-bath`,
                  0.6
                );
              });
            });

            // Add price range with bed/bath combinations
            priceRanges.forEach((priceRange) => {
              bedOptions.forEach((beds) => {
                bathOptions.forEach((baths) => {
                  this.addUrl(
                    `${propBase}/${priceRange.path}/${beds}-plus-bed/${baths}-plus-bath`,
                    0.55
                  );
                });
              });
            });
          });

          // Add combinations without property type
          priceRanges.forEach((priceRange) => {
            this.addUrl(`${transBase}/${priceRange.path}`, 0.65);
          });

          bedOptions.forEach((beds) => {
            this.addUrl(`${transBase}/${beds}-plus-bed`, 0.65);

            bathOptions.forEach((baths) => {
              this.addUrl(
                `${transBase}/${beds}-plus-bed/${baths}-plus-bath`,
                0.6
              );
            });
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

          priceRanges.forEach((priceRange) => {
            this.addUrl(`${propBase}/${priceRange.path}`, 0.65);
          });
        });

        // Add price ranges without property type
        priceRanges.forEach((priceRange) => {
          this.addUrl(`${transBase}/${priceRange.path}`, 0.65);
        });

        // Add bed/bath combinations
        bedOptions.forEach((beds) => {
          this.addUrl(`${transBase}/${beds}-plus-bed`, 0.65);

          bathOptions.forEach((baths) => {
            this.addUrl(
              `${transBase}/${beds}-plus-bed/${baths}-plus-bath`,
              0.6
            );
          });
        });
      });
    } catch (error) {
      console.error("Error adding dynamic routes:", error);
      throw error;
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
