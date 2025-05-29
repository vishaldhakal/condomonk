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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              City Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage your cities and their details
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            className={`${
              activeTab === "list"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab("list")}
          >
            City List
          </button>
          <button
            className={`${
              activeTab === "add"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => {
              setActiveTab("add");
              setIsEdit(false);
              setCityData(initialCityData);
            }}
          >
            Add City
          </button>
          {isEdit && (
            <button
              className={`${
                activeTab === "edit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Edit City
            </button>
          )}
        </nav>
      </div>

      {/* List View */}
      {activeTab === "list" && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <button
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        </div>
      )}

      {/* Form View */}
      {(activeTab === "add" || activeTab === "edit") && (
        <div className="mt-6">
          <CityForm
            cityData={citydata}
            setCityData={setCityData}
            isEdit={isEdit}
            onSubmit={isEdit ? handleUpdateCity : handleCreateCity}
          />
        </div>
      )}
    </div>
  );
}
