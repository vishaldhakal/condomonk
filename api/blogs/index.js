import { notFound } from "next/navigation";

export const fetchAllBlogPosts = async () => {
  const res = await fetch("https://api.condomonk.ca/api/news/", {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const blogs = await res.json();

  if (Array.isArray(blogs)) {
    return blogs.reverse().slice(0, 10);
  } else {
    console.error("Expected an array but got:", blogs);
    return [];
  }
};

export const fetchBlogPostBySlug = async (slug) => {
  const res = await fetch(`https://api.condomonk.ca/api/news/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const blog = await res.json();
  return blog;
};

export const fetchBlogPostByCity = async (citySlug) => {
  const res = await fetch(
    `https://api.condomonk.ca/api/news/?city=${citySlug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const blogs = await res.json();

  if (Array.isArray(blogs)) {
    return blogs.reverse();
  } else {
    console.error("Expected an array but got:", blogs);
    return [];
  }
};

export const fetchCities = async () => {
  const res = await fetch("https://api.condomonk.ca/api/all-city/", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

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
};
