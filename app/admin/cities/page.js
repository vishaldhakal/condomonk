"use client";
import { useState, useEffect } from "react";
import CityTable from "@/components/CityTable";
import CityForm from "@/components/CityForm";
import axios from "axios";
import swal from "sweetalert";

export default function Cities() {
  const initialCityData = {
    id: 0,
    name: "",
    details: "",
    townhomes_details: "",
    condos_details: "",
    upcoming_details: "",
    detached_details: "",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [citydata, setCityData] = useState(initialCityData);
  const [cities, setCities] = useState([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("list");

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

  const handleCreateCity = (cityData) => {
    axios
      .post("https://api.condomonk.ca/api/city/", cityData)
      .then((res) => {
        setRefetch(!refetch);
        setCityData(initialCityData);
        setActiveTab("list");
        swal({
          text: `${cityData.name} has been created!`,
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateCity = (cityData) => {
    axios
      .put(`https://api.condomonk.ca/api/city/${cityData.id}/`, cityData)
      .then((res) => {
        setIsEdit(false);
        setRefetch(!refetch);
        setActiveTab("list");
        swal({
          text: `${cityData.name} has been updated!`,
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

  const handleEdit = (e, id) => {
    e.preventDefault();
    axios
      .get(`https://api.condomonk.ca/api/city/${id}/`)
      .then((res) => {
        setIsEdit(true);
        setCityData(res.data);
        setActiveTab("edit");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">City Management</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            City List
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("add");
              setIsEdit(false);
              setCityData(initialCityData);
            }}
          >
            Add City
          </button>
        </li>
        {isEdit && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "edit" ? "active" : ""}`}
            >
              Edit City
            </button>
          </li>
        )}
      </ul>

      {activeTab === "list" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                className="btn btn-outline-primary ms-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <button
              className="btn btn-success"
              onClick={() => setActiveTab("add")}
            >
              Add New City
            </button>
          </div>
          <CityTable
            cities={cities}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}

      {(activeTab === "add" || activeTab === "edit") && (
        <CityForm
          cityData={citydata}
          setCityData={setCityData}
          isEdit={isEdit}
          onSubmit={isEdit ? handleUpdateCity : handleCreateCity}
        />
      )}
    </div>
  );
}
