import { notFound } from "next/navigation";

export const fetchAllBlogPosts = async () => {
  const res = await fetch("https://api.condomonk.ca/api/news/", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    notFound();
  }

  const blogs = await res.json();

  // REQUIRED LATERON AFTER TIME COMES FROM API
  // const sortedBlogs = blogs.sort(
  //   (a, b) => new Date(b.date_of_upload) - new Date(a.date_of_upload)
  // );

  return blogs.reverse();
};

export const fetchBlogPostBySlug = async (slug) => {
  const res = await fetch(`https://api.condomonk.ca/api/news/${slug}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    notFound();
  }

  const blogs = await res.json();
  return blogs;
};

export const fetchBlogPostByCity = async (citySlug) => {
  const res = await fetch(
    `https://api.condomonk.ca/api/news/?city=${citySlug}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const blogs = await res.json();
  return blogs.reverse();
};

export const fetchCities = async () => {
  const res = await fetch("https://api.condomonk.ca/api/all-city/", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    notFound();
  }

  const cities = await res.json();

  //append All to top of list
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
