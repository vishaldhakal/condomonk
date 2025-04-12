import React from "react";

//API
import { fetchBlogPostByCity, fetchBlogPostBySlug } from "@/api/blogs";
import { endPoints } from "@/api/endpoints";

//LIB
import Link from "next/link";
import dayjs from "dayjs";

//COMPONENT
import BottomContactForm from "@/components/BottomContactForm";
import SocialMediaShare from "@/components/SocialMediaShare";
import BlogCard from "@/components/blogCard";

//STYLES
import "../blog.css";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateMetadata({ params }, parent) {
  const blogSlug = params?.blogDetail;

  const blog = await fetchBlogPostBySlug(blogSlug);

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/blogs/${blogSlug}`,
    },
    title: `${blog.news_title}`,
  };
}

const BlogDetails = async ({ params }) => {
  const blogSlug = params?.blogDetail;

  const blog = await fetchBlogPostBySlug(blogSlug);
  const relatedBlogPosts = await fetchBlogPostByCity(blog.city.slug);

  //filter out related blogs for the same city
  const filteredBlogPostsBasedOnCity = relatedBlogPosts.filter(
    (relatedBlog) => blog.slug !== relatedBlog.slug
  );

  return (
    <div className="blog__details">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-10 mx-auto ">
            <Breadcrumb
              homeElement={"Home"}
              separator={
                <span>
                  {" "}
                  <svg
                    className="svg minearr"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z"
                      fill={"#869099"}
                    ></path>
                  </svg>{" "}
                </span>
              }
              activeClasses="text-dark "
              containerClasses="d-flex align-items-center p-0 m-0 pt-4 breadcrumb"
              listClasses="mx-1"
              capitalizeLinks
            />
            <div className="city my-3 mt-4">
              <Link href={`/blogs/category/${blog.city.slug}`}>
                <div className="tag fw-bold">
                  <p>{blog.city.name}</p>
                </div>
              </Link>
            </div>

            <div className="blog-title">
              <h1 className="main-title py-3 mb-3 fs-1">{blog.news_title}</h1>
            </div>
            <section className="blog__author d-flex align-items-center mt-3">
              <div className="blog__author-image">
                <img
                  width="60px"
                  height="60px"
                  className="rounded-circle"
                  src="https://admin.homebaba.ca/media/agent_UGllzo7.jpg"
                  alt="blog-author"
                />
              </div>
              <div className="row flex-grow-1 ps-3">
                <div className="blog__author-detail col-sm-12 col-md-9 ">
                  <div className="fw-bold">The Condomonk Content Team</div>
                  <div className="text-secondary">
                    Posted {dayjs(blog?.date_of_upload).format("MMMM DD, YYYY")}
                  </div>
                </div>

                <div className="blog-read__time text-secondary text-start col-sm-12 col-md-3">
                  <div className="blog-read__time-name">Blog</div>
                  <div>5 min read</div>
                </div>
              </div>
            </section>

            <div className="blog__share my-4 d-flex align-items-baseline gap-4">
              <p className="fw-bold text-secondary ps-2">Share</p>
              <SocialMediaShare />
            </div>

            <div className="horizontal-row mt-4 mb-5" />
            <section className="blog__desc mt-4">
              <div className="banner-image">
                <img
                  src={endPoints.baseURL + blog.news_thumbnail}
                  alt={blog.news_title.slice(0, 10)}
                  loading="lazy"
                  width="100%"
                  height="100%"
                  className="img-fluid"
                />
              </div>

              <div
                className="mt-4"
                id="make-img-responsive"
                dangerouslySetInnerHTML={{
                  __html: blog.news_description,
                }}
              />
            </section>

            {filteredBlogPostsBasedOnCity.length > 0 ? (
              <>
                <section className="blogs__related mt-5">
                  <h3 className="main-title">You might be interested in</h3>
                  <article>
                    <div className="row mt-4">
                      {filteredBlogPostsBasedOnCity.map((blog, index) => {
                        return (
                          <div
                            className="col-sm-12 col-md-6 col-lg-4 mb-4"
                            key={index}
                          >
                            <BlogCard blog={blog} />
                          </div>
                        );
                      })}
                    </div>
                  </article>
                </section>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="py-5 my-3 d-none d-md-block">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <img
              src="/contact-bottom-2.png"
              alt="dce"
              className="img-fluid w-25 w-smm-50 mb-3"
            />
          </div>
          <h2 className="fw-mine text-center px-md-4 fs-4">
            Contact Dolphy Team Today
          </h2>
          <div className="row row-cols-1 row-cols-md-3 mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <BottomContactForm
                proj_name={blog.news_title}
                city="Blog Page"
              ></BottomContactForm>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
