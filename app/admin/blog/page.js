"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import swal from "sweetalert";
import NewsTable from "@/components/NewsTable";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function UploadBlog() {
  let stat = {
    id: 1,
    news_title: "",
    news_description: "",
    news_link: "#",
    news_thumbnail: null,
    city: {
      name: "",
      slug: "",
    },
  };

  const [isEdit, setIsEdit] = useState(false);
  const [refetch, setRefetcch] = useState(true);
  const [newsdata, setNewsData] = useState(stat);
  const [modalnews, setModalNews] = useState(false);
  const [news, setNews] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCreateNews = (e) => {
    e.preventDefault();
    console.log(newsdata);

    if (
      newsdata.news_title == "" ||
      newsdata.news_description == "" ||
      newsdata.news_link == "" ||
      newsdata.news_thumbnail == "" ||
      newsdata.city.name == ""
    ) {
      swal({
        title: "Error!",
        text: "Please fill all the fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    axios
      .post("https://api.dolphy.ca/api/news/", newsdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setRefetcch(!refetch);
        setNewsData(stat);
        setModalNews(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleUpdateNews = (e) => {
    e.preventDefault();
    //handle the empty fields before uploading
    if (
      newsdata.news_title == "" ||
      newsdata.news_description == "" ||
      newsdata.news_link == "" ||
      newsdata.city.name == ""
    ) {
      swal({
        title: "Error!",
        text: "Please fill all the fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    let updatenewsdata = newsdata;

    if (
      newsdata.news_thumbnail == null ||
      typeof newsdata.news_thumbnail == "string"
    ) {
      updatenewsdata = {
        news_title: newsdata.news_title,
        news_description: newsdata.news_description,
        news_link: newsdata.news_link,
        city: newsdata.city,
      };
    } else {
      updatenewsdata = {
        news_title: newsdata.news_title,
        news_description: newsdata.news_description,
        news_link: newsdata.news_link,
        news_thumbnail: newsdata.news_thumbnail,
        city: newsdata.city,
      };
    }

    axios
      .put(`https://api.dolphy.ca/api/news/${newsdata.id}/`, updatenewsdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setModalNews(false);
        setIsEdit(false);
        setRefetcch(!refetch);
        swal({
          text: newsdata.news_title + " has been updated!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        setNewsData(stat);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleDelete = (e, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this news!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteNews(id);
        swal({
          text: "Your news has been deleted!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      } else {
        swal({
          title: "Cancelled",
          text: "Your news is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  function deleteNews(id) {
    axios
      .delete(`https://api.dolphy.ca/api/news/${id}/`)
      .then((res) => {
        setRefetcch(!refetch);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  useEffect(() => {
    axios
      .get("https://api.dolphy.ca/api/news/")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });

    axios
      .get("https://api.dolphy.ca/api/city/")
      .then((res) => {
        setCities(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewsData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    axios
      .get(`https://api.dolphy.ca/api/news/${id}/`)
      .then((res) => {
        setModalNews(true);
        setIsEdit(true);
        setNewsData(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleImageChange = (e) => {
    let newData = { ...newsdata };
    newData["news_thumbnail"] = e.target.files[0];
    setNewsData(newData);
  };

  const handleBlogDescChange = (newText) => {
    setNewsData((prevState) => ({
      ...prevState,
      ["news_description"]: newText,
    }));
  };

  return (
    <>
      {modalnews && (
        <div className="modal" style={{ zIndex: 1000 }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header ps-5">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Upload Blog
                </h1>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setModalNews(false);
                    setNewsData(stat);
                    setIsEdit(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#ff0000"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
              <div className="modal-body px-5">
                <div className="row row-cols-1 gy-4">
                  <div className="col-8">
                    <div className=" w-100">
                      <label htmlFor="news_title" className="form-label">
                        Blog Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="news_title"
                        value={newsdata.news_title}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="w-100">
                      <label htmlFor="city" className="form-label">
                        City <span className="text-danger">*</span>
                      </label>

                      <select
                        className="form-select"
                        id="city"
                        value={newsdata.city.name}
                        onChange={(e) => {
                          const { value } = e.target;
                          setNewsData((prevState) => ({
                            ...prevState,
                            city: {
                              name: value,
                              slug: value.toLowerCase().replace(/ /g, "-"),
                            },
                          }));
                        }}
                      >
                        <option value="">Select City</option>
                        {cities &&
                          cities.map((city, index) => (
                            <option key={index} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-100 thumbnail mt-4">
                  {isEdit && (
                    <img
                      src={newsdata.news_thumbnail}
                      alt=""
                      className="img-fluid"
                    />
                  )}
                  <label htmlFor="image" className="form-label">
                    Blog Thumbnail <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control py-3"
                    id="news_thumbnail"
                    onChange={(e) => {
                      handleImageChange(e);
                    }}
                  />
                </div>

                <div className="blogs-detail mt-4">
                  <label className="form-label fw-bold">
                    Blog Detail <span className="text-danger">*</span>{" "}
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={newsdata.news_description}
                    style={{ height: "200px" }}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                      clipboard: {
                        // toggle to add extra line breaks when pasting HTML:
                        matchVisual: false,
                      },
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "link",
                      "image",
                      "video",
                    ]}
                    onChange={handleBlogDescChange}
                  />
                </div>
              </div>
              <div className="modal-footer px-5">
                {!isEdit ? (
                  <button
                    className="btn btn-success d-flex justify-content-center w-100 btn-lg"
                    onClick={(e) => handleCreateNews(e)}
                  >
                    Create
                  </button>
                ) : (
                  <button
                    className="btn btn-success d-flex justify-content-center w-100 btn-lg"
                    onClick={(e) => handleUpdateNews(e)}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-4 w-100 ">
        <div className="row row-cols-1 row-cols-md-5 d-flex align-items-center mx-0">
          <div className="col-md-8">
            <h5 className="fw-bold mb-0">Blog</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button
              className="btn btn-success py-3"
              onClick={() => setModalNews(true)}
            >
              Add New Blog
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
      <NewsTable
        news={news}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></NewsTable>
    </>
  );
}
