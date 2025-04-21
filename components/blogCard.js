import React from "react";

//LIB
import Link from "next/link";
import dayjs from "dayjs";

//API
import { endPoints } from "@/api/endpoints";

//STYLES
import "../app/blogs/blog.css";

const BlogCard = ({ blog }) => {
  return (
    <div className="card border-0  my-3 my-md-0 blog-container shadow-lg position-relative">
      {/* Wrap the card in the Link component */}
      <Link href={`/blogs/${blog.slug}`} passHref className="h-100">
        <div className="image-container w-100 position-relative">
          <img
            loading="lazy"
            className="card-img-top"
            src={endPoints.baseURL + blog.news_thumbnail}
            alt={blog.news_title.slice(0, 10)}
            style={{ filter: "brightness(0.8)" }}
          />
          <div
            className="tags-container position-absolute bottom-0 mb-3"
            style={{ left: "20px" }}
          >
            <Link href={`/blogs/category/${blog.city.slug}`}>
              <div className="tag">
                <p>{blog.city.name}</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="card-body d-flex flex-column text-dark">
          <h5 className="card-title font-weight-bold text-dark title-container mb-4">
            {blog.news_title}
          </h5>

          <div className="text-secondary position-absolute bottom-0 mb-3">
            Posted {dayjs(blog?.date_of_upload).format("MMMM DD, YYYY")}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
