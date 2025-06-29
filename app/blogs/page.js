import React from "react";
import { Suspense } from "react";
import { fetchAllBlogPosts, fetchCities } from "@/api/blogs";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import BottomContactForm from "@/components/BottomContactForm";
import CityInsights from "@/components/CityInsights";

// Metadata for SEO
export const metadata = {
  title: "Condomonk Blogs | Insights on Real Estate",
  description:
    "Stay updated with the latest real estate insights, market trends, and property news through Condomonk's expert blog articles.",
  alternates: {
    canonical: "https://condomonk.ca/blogs/",
  },
};

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
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">
          No blog posts available at the moment. Check back soon for updates!
        </p>
      </div>
    );
  }

  // Sort blogs by date_of_upload in descending order (newest first)
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date_of_upload) - new Date(a.date_of_upload)
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
      {sortedBlogs.map((blog, index) => (
        <BlogCard key={blog.id || index} blog={blog} />
      ))}
    </div>
  );
}

const torontoDate = new Date().toLocaleDateString("en-CA", {
  timeZone: "America/Toronto",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function Blogs() {
  const [blogPosts, cities] = await Promise.all([
    fetchAllBlogPosts(),
    fetchCities(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
          <div className="flex flex-col md:flex-row gap-8 pt-8">
            {/* Left column: Cities */}
            <aside className="md:w-1/5 w-full mb-8 md:mb-0 md:h-[70vh] md:overflow-y-auto hide-scrollbar sticky top-10">
              <Suspense
                fallback={
                  <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
                }
              >
                <CityInsights cities={cities} />
              </Suspense>
            </aside>

            {/* Right column: Blog posts */}
            <main className=" w-full">
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
              <BottomContactForm proj_name="Blog" city="Blog Page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
