"use client";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import swal from "sweetalert";
import NewsTable from "@/components/NewsTable";

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
  const [refetch, setRefetch] = useState(true);
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
      .post("https://api.condomonk.ca/api/news/", newsdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setRefetch(!refetch);
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
      .put(
        `https://api.condomonk.ca/api/news/${newsdata.id}/`,
        updatenewsdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setModalNews(false);
        setIsEdit(false);
        setRefetch(!refetch);
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
      .delete(`https://api.condomonk.ca/api/news/${id}/`)
      .then((res) => {
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/news/")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });

    axios
      .get("https://api.condomonk.ca/api/city/?page_size=100")
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
      .get(`https://api.condomonk.ca/api/news/${id}/`)
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl my-8">
            <div className="p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center sticky top-0 bg-white z-10 pb-4 border-b">
                <h1 className="text-xl font-bold">
                  {isEdit ? "Edit Blog" : "Upload Blog"}
                </h1>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full text-red-600"
                  onClick={() => {
                    setModalNews(false);
                    setNewsData(stat);
                    setIsEdit(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Blog Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        id="news_title"
                        value={newsdata.news_title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                        {cities?.map((city, index) => (
                          <option key={index} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {isEdit && (
                    <img
                      src={newsdata.news_thumbnail}
                      alt=""
                      className="max-h-48 object-contain"
                    />
                  )}
                  <label className="block text-sm font-medium text-gray-700">
                    Blog Thumbnail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    id="news_thumbnail"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Blog Detail <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-gray-200 rounded-lg">
                    <Editor
                      apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                      value={newsdata.news_description}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                      }}
                      onEditorChange={(content) => {
                        handleBlogDescChange(content);
                      }}
                    />
                  </div>
                </div>

                <button
                  className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200 ${
                    !isEdit
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={(e) =>
                    !isEdit ? handleCreateNews(e) : handleUpdateNews(e)
                  }
                >
                  {!isEdit ? "Create" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Blog</h2>
          <button
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
            onClick={() => setModalNews(true)}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Blog
          </button>
        </div>

        <div className="mt-6">
          <NewsTable
            news={news}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
