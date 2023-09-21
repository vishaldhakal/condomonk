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
      .get("https://api.condomonk.ca/api/developers/")
      .then((res) => {
        console.log(res.data.results);
        setDevelopers(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch]);

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
        <div className="modal">
          <section className="modal-main rounded-4">
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload Developer</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setModalDeveloper(false);
                    setDeveloperData(stat);
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
              <div className="py-3 mt-2">
                <div className="row row-cols-1 gy-4">
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={developerdata.name}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="name">
                        Developer Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={developerdata.phone}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="phone">
                        Phone <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="website_link"
                        value={developerdata.website_link}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="website_link">
                        Website Link <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="w-100">
                      {isEdit && (
                        <img
                          src={developerdata.image}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                      <label htmlFor="image">
                        {!isEdit && (
                          <>
                            Logo / Banner <span className="text-danger">*</span>
                          </>
                        )}
                        {isEdit && (
                          <>
                            New Logo / Banner{" "}
                            <span className="text-danger">*</span>
                          </>
                        )}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="fw-bold mb-1 mt-2">
                      About <span className="text-danger">*</span>{" "}
                    </p>
                    <textarea
                      name="details"
                      id="details"
                      rows={8}
                      className="textbox w-100"
                      defaultValue={developerdata.details}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              {!isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleCreateDeveloper(e)}
                >
                  Submit
                </button>
              )}
              {isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleUpdateDeveloper(e)}
                >
                  Update Now
                </button>
              )}
            </div>
          </section>
        </div>
      )}
      <div className="py-4 w-100 ">
        <div className="row row-cols-1 row-cols-md-5 d-flex align-items-center mx-0">
          <div className="col-md-8">
            <h5 className="fw-bold mb-0">Developers</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button
              className="btn btn-success py-3"
              onClick={() => setModalDeveloper(true)}
            >
              Add New Developer
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
      <DeveloperTable
        developers={developers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></DeveloperTable>
    </>
  );
}
