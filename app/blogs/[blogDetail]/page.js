import React from "react";
import { fetchBlogPostByCity, fetchBlogPostBySlug } from "@/api/blogs";
import { endPoints } from "@/api/endpoints";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import BottomContactForm from "@/components/BottomContactForm";
import SocialMediaShare from "@/components/SocialMediaShare";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateMetadata({ params }) {
  const blogSlug = params?.blogDetail;
  const blog = await fetchBlogPostBySlug(blogSlug);

  return {
    title: blog.news_title,
    description: blog.news_description?.slice(0, 160).replace(/<[^>]*>/g, ""),
    alternates: {
      canonical: `https://condomonk.ca/blogs/${blogSlug}`,
    },
    openGraph: {
      title: blog.news_title,
      description: blog.news_description?.slice(0, 160).replace(/<[^>]*>/g, ""),
      url: `https://condomonk.ca/blogs/${blogSlug}`,
      images: [
        {
          url: endPoints.baseURL + blog.news_thumbnail,
          width: 1200,
          height: 630,
          alt: blog.news_title,
        },
      ],
    },
  };
}

function RelatedBlogs({ blogs }) {
  if (!blogs?.length) return null;

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">
        You might be interested in
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <BlogCard key={blog.id || index} blog={blog} />
        ))}
      </div>
    </section>
  );
}

export default async function BlogDetails({ params }) {
  const blogSlug = params?.blogDetail;
  const blog = await fetchBlogPostBySlug(blogSlug);
  const relatedBlogPosts = await fetchBlogPostByCity(blog.city.slug);

  const filteredBlogPosts = relatedBlogPosts.filter(
    (relatedBlog) => blog.slug !== relatedBlog.slug
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
                  />
                </svg>
              </span>
            }
            activeClasses="text-gray-900"
            containerClasses="flex items-center py-4"
            listClasses="mx-1"
            capitalizeLinks
          />

          {/* City Tag */}
          <div className="mt-6">
            <Link href={`/blogs/category/${blog.city.slug}`}>
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                {blog.city.name}
              </span>
            </Link>
          </div>

          {/* Blog Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-8">
            {blog.news_title}
          </h1>

          {/* Author Section */}
          <section className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {/* <Image
                width={60}
                height={60}
                className="rounded-full"
                src="https://admin.homebaba.ca/media/agent_UGllzo7.jpg"
                alt="blog-author"
              /> */}
            </div>
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="col-span-2">
                  <div className="font-bold text-gray-900">
                    The Condomonk Content Team
                  </div>
                  <div className="text-gray-500">
                    Posted {dayjs(blog?.date_of_upload).format("MMMM DD, YYYY")}
                  </div>
                </div>
                <div className="text-gray-500">
                  <div>Blog</div>
                  <div>5 min read</div>
                </div>
              </div>
            </div>
          </section>

          {/* Share Section */}
          <div className="flex items-center space-x-4 my-8">
            <span className="font-semibold text-gray-600">Share</span>
            <SocialMediaShare />
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Blog Content */}
          <section className="mt-8">
            <div className="relative w-full aspect-[16/9] mb-8">
              <img
                src={endPoints.baseURL + blog.news_thumbnail}
                alt={blog.news_title}
                fill
                className="object-cover rounded-lg w-full h-full"
                priority="true"
              />
            </div>

            <div
              className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg [&_table]:!border [&_table]:!border-collapse [&_table]:!border-solid [&_table]:!border-black [&_th]:!border [&_th]:!border-solid [&_th]:!border-black [&_th]:!p-2 [&_td]:!border [&_td]:!border-solid [&_td]:!border-black [&_td]:!p-2 [&_tr]:!border [&_tr]:!border-solid [&_tr]:!border-black rich-text"
              dangerouslySetInnerHTML={{
                __html: blog.news_description,
              }}
            />
          </section>

          {/* Related Blogs */}
          <RelatedBlogs blogs={filteredBlogPosts} />
        </div>

        {/* Contact Form */}
        <div className="mt-24 hidden md:block">
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src="/contact-bottom-2.png"
              alt="Contact Condomonk"
              width={160}
              height={160}
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Contact Condomonk Team Today
            </h2>
            <div className="max-w-xl mx-auto">
              <BottomContactForm proj_name={blog.news_title} city="Blog Page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
