import fs from 'fs';
import path from 'path';
import sitemapConfig from '../config/sitemap.config';

class SitemapGenerator {
  constructor() {
    this.siteUrl = sitemapConfig.siteUrl;
    this.urls = new Set();
  }

  formatDate(date) {
    return date.toISOString().replace(/\.\d+Z$/, '+00:00');
  }

  addUrl(url, priority) {
    // Remove trailing slashes and ensure URL starts with /
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    const finalUrl = cleanUrl.replace(/\/$/, '');

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
      { url: '/', priority: 1.00 },
      { url: '/blogs', priority: 0.80 },
      { url: '/builders', priority: 0.80 },
      { url: '/new-homes', priority: 0.80 },
      { url: '/pre-construction-homes', priority: 0.80 },
      { url: '/resale', priority: 0.80 },
      { url: '/top-10-gta-projects', priority: 0.80 }
    ];

    staticRoutes.forEach(route => {
      this.addUrl(route.url, route.priority);
    });
  }

  async addDynamicRoutes() {
    try {
      // All cities
      const cities = [
        'ajax', 'aurora', 'barrie', 'baxter', 'bolton', 'bradford',
        'brampton', 'brantford', 'burlington', 'burnaby', 'caledon',
        'calgary', 'cambridge', 'east-gwillimbury', 'etobicoke',
        'georgetown', 'grimsby', 'guelph', 'hamilton', 'innisfil',
        'kingston', 'kitchener', 'maple', 'markham', 'milton',
        'mississauga', 'newmarket', 'niagara-falls', 'north-york',
        'oakville', 'orangeville', 'oshawa', 'pickering', 'richmond-hill',
        'scarborough', 'st-catharines', 'stoney-creek', 'toronto',
        'unionville', 'vaughan', 'waterdown', 'waterloo', 'whitby',
        'woodbridge'
      ];

      // Property types and categories
      const propertyTypes = ['condos', 'townhomes', 'detached', 'upcoming', 'price'];

      // Development projects by city
      const developments = {
        'ajax': [
          'reetu-urban-towns',
          'ajax-district-towns',
          'atowns',
          'jax-condos'
        ],
        'aurora': [
          'monteverdi-estates',
          'high-park-urban-towns',
          'polo-club-condos'
        ],
        'barrie': [
          'go-towns',
          'south-barrie-towns',
          'lakeview-towns',
          'pioneer-shores-towns',
          'soba-towns',
          '405-essa-road-condos',
          'the-junction-condos'
        ],
        'bolton': [
          'arpeggio-towns',
          'livello-towns'
        ],
        'bradford': [
          'cachet-bradford-urban-towns'
        ],
        'brampton': [
          'spring-valley-estates',
          'amira-estates',
          'bridle-trail-urban-towns',
          'daniels-mpv2-condos',
          'bristol-place-condos',
          'stella-2-condos',
          'stella-at-southside-condos',
          'omg-2-condos',
          '205-queen-east-condos',
          '132-church-east-condos',
          '123-railroad-street-condos',
          '200-county-court-boulevard-condos',
          '2-county-court-boulevard-condos',
          '1730-queen-street-west-condos',
          '226-queen-street-east-condos',
          '253-queen-street-east-condos'
        ],
        'calgary': [
          'the-restaare-in-belmont',
          'colours-of-seton-townhomes',
          'violette-condos',
          'highgate-condos-912',
          'arabella-towns',
          'east-hills-crossing-towns'
        ],
        'cambridge': [
          'the-gaslight-district-condos'
        ],
        'markham': [
          'park-main-towns'
        ],
        'mississauga': [
          'exhale-condos',
          'm6-condos',
          'high-line-condos-328'
        ],
        'oakville': [
          'oak-co-condos'
        ]
      };

      // Add city routes and their variations
      cities.forEach(city => {
        // Main city page
        this.addUrl(`/${city}`, 0.80);

        // Property type pages for each city
        propertyTypes.forEach(type => {
          this.addUrl(`/${city}/${type}`, 0.80);
        });

        // Special category pages
        this.addUrl(`/new-homes/${city}`, 0.80);
        this.addUrl(`/pre-construction-homes/${city}`, 0.80);

        // Development pages for cities that have them
        if (developments[city]) {
          developments[city].forEach(development => {
            this.addUrl(`/${city}/${development}`, 0.64);
          });
        }
      });

      // Add additional property type combinations
      const propertyCategories = [
        'new-construction',
        'pre-construction',
        'resale',
        'assignment'
      ];

      cities.forEach(city => {
        propertyCategories.forEach(category => {
          this.addUrl(`/${city}/${category}`, 0.80);
        });
      });

    } catch (error) {
      console.error('Error adding dynamic routes:', error);
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
    const xmlFooter = '</urlset>';
    
    // Join URLs with newlines and proper spacing
    const urlsContent = Array.from(this.urls).join('\n');
    
    return xmlHeader + urlsContent + '\n' + xmlFooter;
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
      const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
      fs.writeFileSync(outputPath, sitemapXml);

      return {
        success: true,
        message: 'Sitemap generated successfully',
        path: '/sitemap.xml'
      };
    } catch (error) {
      console.error('Error generating sitemap:', error);
      return {
        success: false,
        message: 'Error generating sitemap',
        error: error.message
      };
    }
  }
}

export default new SitemapGenerator();
