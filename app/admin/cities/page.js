"use client";
import { useState, useEffect } from "react";
import CityTable from "@/components/CityTable";
import axios from "axios";
import swal from "sweetalert";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Cities() {
  let stat = {
    id: 1,
    name: "",
    details: "",
  };
  const [isEdit, setIsEdit] = useState(false);
  const [refetch, setRefetcch] = useState(true);
  const [citydata, setCityData] = useState(stat);
  const [modalevent, setModalCity] = useState(false);
  const [cities, setCities] = useState([]);

  const handleCreateCity = (e) => {
    e.preventDefault();
    if (citydata.name == "") {
      swal({
        title: "Error!",
        text: "Please enter name",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    axios
      .post("https://api.condomonk.ca/api/city/", citydata)
      .then((res) => {
        setRefetcch(!refetch);
        setCityData(stat);
        setModalCity(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleUpdateCity = (e) => {
    e.preventDefault();
    if (citydata.name == "") {
      swal({
        title: "Error!",
        text: "Please fill all the fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    let updatecitydata = citydata;
    axios
      .put(`https://api.condomonk.ca/api/city/${citydata.id}/`, updatecitydata)
      .then((res) => {
        setModalCity(false);
        setIsEdit(false);
        setRefetcch(!refetch);
        swal({
          text: citydata.name + " has been updated!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        setCityData(stat);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    //Create swal confirmation for confirming delete
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this event!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteEvent(id);
        swal({
          text: "Your event has been deleted!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      } else {
        swal({
          title: "Cancelled!",
          text: "Your event is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  function deleteEvent(id) {
    axios
      .delete(`https://api.condomonk.ca/api/city/${id}/`)
      .then((res) => {
        console.log(res);
        setRefetcch(!refetch);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }
  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/city/")
      .then((res) => {
        console.log(res.data.results);
        setCities(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCityData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    axios
      .get(`https://api.condomonk.ca/api/city/${id}/`)
      .then((res) => {
        console.log(res.data);
        setModalCity(true);
        setIsEdit(true);
        setCityData(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  return (
    <>
      {modalevent && (
        <div className="modal">
          <section className="modal-main rounded-4">
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload City</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setModalCity(false);
                    setCityData(stat);
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
                  <div className="col-12">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={citydata.name}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="name">
                        City Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <ReactQuill
                      theme="snow"
                      value={citydata.details}
                      style={{ height: "450px", marginBottom: "80px" }}
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ size: [] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
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
                      onChange={(newText) =>
                        setCityData((prevState) => ({
                          ...prevState,
                          ["details"]: newText,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              {!isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleCreateCity(e)}
                >
                  Submit
                </button>
              )}
              {isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleUpdateCity(e)}
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
            <h5 className="fw-bold mb-0">Cities</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button
              className="btn btn-success py-3"
              onClick={() => setModalCity(true)}
            >
              Add New City
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
      <CityTable
        cities={cities}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></CityTable>
    </>
  );
}
