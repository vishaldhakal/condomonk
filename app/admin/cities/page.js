"use client";
import { useState, useEffect } from "react";
import CityTable from "@/components/CityTable";
import axios from "axios";
import swal from "sweetalert";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Cities() {
  const initialCityData = {
    id: 0,
    name: "",
    details: "",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [citydata, setCityData] = useState(initialCityData);
  const [modalOpen, setModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [refetch, currentPage]);

  const fetchData = () => {
    axios
      .get(
        `https://api.condomonk.ca/api/city/?page_size=${pageSize}&page=${currentPage}`
      )
      .then((res) => {
        setCities(res.data.results);
        setTotalPages(Math.ceil(res.data.count / pageSize));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCreateCity = (e) => {
    e.preventDefault();
    if (!citydata.name.trim()) {
      swal({
        title: "Error!",
        text: "Please enter a city name",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    axios
      .post("https://api.condomonk.ca/api/city/", citydata)
      .then((res) => {
        setRefetch(!refetch);
        setCityData(initialCityData);
        setModalOpen(false);
        swal({
          text: `${citydata.name} has been created!`,
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateCity = (e) => {
    e.preventDefault();
    if (!citydata.name.trim()) {
      swal({
        title: "Error!",
        text: "Please enter a city name",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    axios
      .put(`https://api.condomonk.ca/api/city/${citydata.id}/`, citydata)
      .then((res) => {
        setModalOpen(false);
        setIsEdit(false);
        setRefetch(!refetch);
        swal({
          text: `${citydata.name} has been updated!`,
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        setCityData(initialCityData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this city!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://api.condomonk.ca/api/city/${id}/`)
          .then((res) => {
            setRefetch(!refetch);
            swal({
              text: "The city has been deleted!",
              icon: "success",
              timer: 1000,
              buttons: false,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        swal({
          title: "Cancelled!",
          text: "Your city is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

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
        setModalOpen(true);
        setIsEdit(true);
        setCityData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {modalOpen && (
        <div className="modal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEdit ? "Update City" : "Add New City"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setModalOpen(false);
                    setCityData(initialCityData);
                    setIsEdit(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      City Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={citydata.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="details" className="form-label">
                      City Details
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={citydata.details}
                      onChange={(newDetails) =>
                        setCityData((prevState) => ({
                          ...prevState,
                          details: newDetails,
                        }))
                      }
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
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                {!isEdit ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleCreateCity}
                  >
                    Create City
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdateCity}
                  >
                    Update City
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h5 className="fw-bold mb-0">Cities</h5>
              <div className="pagination mt-4 d-flex gap-3 align-items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-outline-dark"
                >
                  Previous
                </button>
                <span className="mx-5">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline-dark"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-end">
              <button
                className="btn btn-success"
                onClick={() => setModalOpen(true)}
              >
                Add New City
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <CityTable
              cities={cities}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}
