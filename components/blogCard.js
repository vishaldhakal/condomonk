import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { endPoints } from "@/api/endpoints";

export default function BlogCard({ blog }) {
  // Ensure the image URL is properly formed
  const getImageUrl = (thumbnail) => {
    if (!thumbnail) return null;
    // If the thumbnail already starts with the full URL, use it
    if (thumbnail.startsWith("https://")) return thumbnail;
    // Otherwise, combine with baseURL
    return `${endPoints.baseURL}${
      thumbnail.startsWith("/") ? "" : "/"
    }${thumbnail}`;
  };

  const imageUrl = getImageUrl(blog.news_thumbnail);

  return (
    <div className="relative my-3 md:my-0 rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="relative w-full aspect-[4/3]">
        <Link href={`/blogs/${blog.slug}`} className="block h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={blog.news_title.slice(0, 10)}
              fill
              className="object-cover brightness-80"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </Link>
        <div className="absolute bottom-0 left-5 mb-3">
          <Link href={`/blogs/category/${blog.city.slug}`}>
            <div className="inline-block px-3 py-1 text-sm font-medium bg-white rounded-full">
              {blog.city.name}
            </div>
          </Link>
        </div>
      </div>
      <Link href={`/blogs/${blog.slug}`} className="block text-decoration-none">
        <div className="relative p-4">
          <h5 className="font-bold text-lg text-gray-900 mb-4 line-clamp-2">
            {blog.news_title}
          </h5>
          <div className="absolute bottom-0 mb-3 text-sm text-gray-500">
            Posted {dayjs(blog?.date_of_upload).format("MMMM DD, YYYY")}
          </div>
        </div>
      </Link>
    </div>
  );
}
