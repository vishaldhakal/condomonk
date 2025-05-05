import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { endPoints } from "@/api/endpoints";

const BlogCard = ({ blog }) => {
  const { slug, news_thumbnail, news_title, city, date_of_upload } = blog;

  // Calculate read time based on content length (approximately 200 words per minute)
  const readTime = Math.max(1, Math.ceil(news_title.split(" ").length / 200));

  return (
    <article className="group flex flex-col overflow-hidden">
      <div className="relative mb-3">
        <Link href={`/blogs/${slug}`} className="block">
          <img
            loading="lazy"
            className="h-48 w-full rounded-lg object-cover"
            src={`${endPoints.baseURL}${news_thumbnail}`}
            alt={news_title}
          />
        </Link>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="mb-1">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 border border-gray-500 rounded-full px-2 py-1">
            News
          </span>
        </div>

        <Link href={`/blogs/${slug}`}>
          <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-blue-600">
            {news_title}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{readTime} min read</span>
          <span>•</span>
          <Link
            href={`/blogs/category/${city.slug}`}
            className="hover:text-blue-600"
          >
            {city.name}
          </Link>
        </div>
      </div>
    </article>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    news_thumbnail: PropTypes.string.isRequired,
    news_title: PropTypes.string.isRequired,
    city: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    date_of_upload: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;
