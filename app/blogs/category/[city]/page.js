import React from "react";
import { Suspense } from "react";
import { fetchBlogPostByCity, fetchCities } from "@/api/blogs";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import BottomContactForm from "@/components/BottomContactForm";
import CityInsights from "@/components/CityInsights";

export async function generateMetadata({ params }) {
  const cityName =
    params?.city?.charAt(0).toUpperCase() + params?.city?.slice(1);

  return {
    title: `${cityName} Real Estate Blog Posts | Condomonk`,
    description: `Stay updated with the latest ${cityName} real estate insights, market trends, and property news through Condomonk's expert blog articles.`,
    alternates: {
      canonical: `https://condomonk.ca/blogs/category/${params?.city}`,
    },
  };
}
const torontoDate = new Date().toLocaleDateString("en-CA", {
  timeZone: "America/Toronto",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Loading component for blog cards
function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

// Blog list component with loading state
function BlogList({ blogs }) {
  if (!blogs?.length) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl font-bold text-gray-400">
          No blog posts found for this city
        </p>
        <p className="text-gray-500 mt-2">
          Check back soon for updates about this location
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {blogs.map((blog, index) => (
        <BlogCard key={blog.id || index} blog={blog} />
      ))}
    </div>
  );
}

export default async function CityBlogs({ params }) {
  const [blogPosts, cities] = await Promise.all([
    fetchBlogPostByCity(params?.city),
    fetchCities(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          homeElement={"Home"}
          separator={
            <span className="mx-2">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          }
          activeClasses="text-gray-900"
          containerClasses="flex items-center py-4"
          listClasses="mx-1"
          capitalizeLinks
          removePathName="Category"
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 max-w-3xl mx-auto text-center my-2 pt-6">
            Explore 2025 real estate trends in Canada, with daily updates and
            city-specific comparisons
          </h1>
          <p className="max-w-3xl mx-auto text-center mb-8">
            Check out Month to Month Real Estate Trends in your city | Last
            updated: {torontoDate}{" "}
          </p>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: City Insights */}
            <aside className="md:w-1/5 w-full mb-8 md:mb-0 md:h-[70vh] md:overflow-y-auto hide-scrollbar sticky top-10">
              <Suspense
                fallback={
                  <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
                }
              >
                <CityInsights particularCity={params?.city} cities={cities} />
              </Suspense>
            </aside>

            {/* Right: Blog Posts */}
            <main className="w-full">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                      <BlogCardSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <BlogList blogs={blogPosts} />
              </Suspense>
            </main>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-24 hidden md:block">
          <div className="max-w-4xl mx-auto text-center">
            <img
              src="/contact-bottom-2.png"
              alt="Contact Condomonk"
              className="w-40 mx-auto mb-6"
              width={160}
              height={160}
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Contact Condomonk Team Today
            </h2>
            <div className="max-w-xl mx-auto">
              <BottomContactForm proj_name={params.city} city="Blog Page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
