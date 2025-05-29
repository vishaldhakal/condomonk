"use client";
import { useState, useEffect } from "react";
import DeveloperTable from "@/components/DeveloperTable";
import axios from "axios";
import swal from "sweetalert";

export default function Developers() {
  let stat = {
    id: 1,
    name: "",
    phone: "",
    website_link: "",
    details: "",
    image: null,
  };

  const [isEdit, setIsEdit] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [developerdata, setDeveloperData] = useState(stat);
  const [modaldeveloper, setModalDeveloper] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // You can adjust this as needed

  const handleCreateDeveloper = (e) => {
    e.preventDefault();
    console.log(developerdata);
    if (
      developerdata.name == "" ||
      developerdata.phone == "" ||
      developerdata.website_link == "" ||
      developerdata.details == "" ||
      developerdata.image == null
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
      .post("https://api.condomonk.ca/api/developers/", developerdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setRefetch(!refetch);
        setDeveloperData(stat);
        setModalDeveloper(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleUpdateDeveloper = (e) => {
    e.preventDefault();
    //handle the empty fields before uploading
    if (
      developerdata.name == "" ||
      developerdata.phone == "" ||
      developerdata.website_link == "" ||
      developerdata.details == ""
    ) {
      swal({
        title: "Error!",
        text: "Please fill all the fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    let updatedeveloperdata = developerdata;

    if (developerdata.image == null || typeof developerdata.image == "string") {
      updatedeveloperdata = {
        name: developerdata.name,
        phone: developerdata.phone,
        website_link: developerdata.website_link,
        details: developerdata.details,
      };
    } else {
      updatedeveloperdata = {
        name: developerdata.name,
        phone: developerdata.phone,
        website_link: developerdata.website_link,
        details: developerdata.details,
        image: developerdata.image,
      };
    }
    axios
      .put(
        `https://api.condomonk.ca/api/developers/${developerdata.id}/`,
        updatedeveloperdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setModalDeveloper(false);
        setDeveloperData(stat);
        setIsEdit(false);
        setRefetch(!refetch);
        swal({
          text: "Your developer has been updated!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  //Createhandledelete
  const handleDelete = (e, id) => {
    //Create swal confirmation for confirming delete
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this developer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDeveloper(id);
        swal({
          text: "Your developer has been deleted!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      } else {
        swal({
          title: "Cancelled",
          text: "Your developer is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  function deleteDeveloper(id) {
    axios
      .delete(`https://api.condomonk.ca/api/developers/${id}/`)
      .then((res) => {
        console.log(res);
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  useEffect(() => {
    axios
      .get(
        `https://api.condomonk.ca/api/developers/?page_size=${pageSize}&page=${currentPage}`
      )
      .then((res) => {
        console.log(res.data.results);
        setDevelopers(res.data.results);
        setTotalPages(res.data.count / pageSize);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDeveloperData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    axios
      .get(`https://api.condomonk.ca/api/developers/${id}/`)
      .then((res) => {
        console.log(res.data);
        setModalDeveloper(true);
        setIsEdit(true);
        setDeveloperData(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleImageChange = (e) => {
    let newData = { ...developerdata };
    newData["image"] = e.target.files[0];
    setDeveloperData(newData);
  };

  return (
    <>
      {modaldeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <section className="bg-white rounded-lg w-full max-w-4xl mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Upload Developer</p>
                <button
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={() => {
                    setModalDeveloper(false);
                    setDeveloperData(stat);
                    setIsEdit(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      id="name"
                      value={developerdata.name}
                      onChange={(e) => handleChange(e)}
                      placeholder=" "
                    />
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
                      Developer Name <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      id="phone"
                      value={developerdata.phone}
                      onChange={(e) => handleChange(e)}
                      placeholder=" "
                    />
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
                      Phone <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      id="website_link"
                      value={developerdata.website_link}
                      onChange={(e) => handleChange(e)}
                      placeholder=" "
                    />
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
                      Website Link <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative">
                    {isEdit && (
                      <img
                        src={developerdata.image}
                        alt=""
                        className="max-h-32 object-contain mb-2"
                      />
                    )}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {!isEdit ? "Logo / Banner " : "New Logo / Banner "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                      id="image"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block font-bold mb-2">
                      About <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="details"
                      id="details"
                      rows={8}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      defaultValue={developerdata.details}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>

              {!isEdit ? (
                <button
                  className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  onClick={(e) => handleCreateDeveloper(e)}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  onClick={(e) => handleUpdateDeveloper(e)}
                >
                  Update Now
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Developers</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              onClick={() => setModalDeveloper(true)}
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
              Add New Developer
            </button>
          </div>
        </div>

        <div className="mt-6">
          <DeveloperTable
            developers={developers}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
