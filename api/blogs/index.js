import { notFound } from "next/navigation";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const TIMEOUT = 30000; // 30 seconds

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options, retries = MAX_RETRIES) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), TIMEOUT);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!res.ok) {
        if (res.status === 504) {
          console.log(`Attempt ${i + 1}: Gateway timeout for ${url}`);
          await delay(RETRY_DELAY);
          continue;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res;
    } catch (error) {
      lastError = error;
      if (error.name === "AbortError" || error.message.includes("504")) {
        if (i < retries - 1) {
          console.log(`Attempt ${i + 1} failed for ${url}, retrying...`);
          await delay(RETRY_DELAY);
          continue;
        }
      }
      break;
    }
  }

  throw lastError;
};

export const fetchAllBlogPosts = async () => {
  try {
    const res = await fetchWithRetry("https://api.condomonk.ca/api/news/", {
      next: { revalidate: 3600 },
    });

    const blogs = await res.json();
    return blogs.reverse();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return []; // Return empty array instead of throwing
  }
};

export const fetchBlogPostBySlug = async (slug) => {
  try {
    const res = await fetchWithRetry(
      `https://api.condomonk.ca/api/news/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const blog = await res.json();
    return blog;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    notFound();
  }
};

export const fetchBlogPostByCity = async (citySlug) => {
  try {
    const res = await fetchWithRetry(
      `https://api.condomonk.ca/api/news/?city=${citySlug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const blogs = await res.json();
    return blogs.reverse();
  } catch (error) {
    console.error(`Error fetching city blogs ${citySlug}:`, error);
    return []; // Return empty array instead of throwing
  }
};

export const fetchCities = async () => {
  try {
    const res = await fetchWithRetry("https://api.condomonk.ca/api/all-city/", {
      next: { revalidate: 3600 },
    });

    const cities = await res.json();

    const allCities = [
      {
        slug: "all",
        name: "All",
        redirectTo: "/blogs",
      },
      ...cities,
    ];

    return allCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return []; // Return empty array instead of throwing
  }
};
