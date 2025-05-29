"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ListingTable from "@/components/ListingTable";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  const [filters, setFilters] = useState({
    city: "All",
    status: "All",
    project_type: "All",
  });
  const [preconstructions, setPreConstructions] = useState([]);
  const [cities, setCities] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function handleChange(e) {
    setFilters({ ...filters, [e.target.id]: e.target.value });
    setRefetch(!refetch);
  }

  useEffect(() => {
    axios
      .get(
        "https://api.condomonk.ca/api/preconstructions/?small=aaa&page_size=10&page=" +
          page +
          "&city=" +
          filters.city +
          "&status=" +
          filters.status +
          "&project_type=" +
          filters.project_type
      )
      .then((res) => {
        console.log(res.data.results);
        setPreConstructions(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 10));
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : err.message);
      });

    axios
      .get("https://api.condomonk.ca/api/city/?show_desc=no")
      .then((res) => {
        setCities(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch, page]);

  const handleDelete = (e, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this listing!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePreConstruction(id);
        swal({
          text: "Your listing has been deleted!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      } else {
        swal({
          title: "Cancelled",
          text: "Your listing is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  function deletePreConstruction(id) {
    axios
      .delete(`https://api.condomonk.ca/api/preconstructions/${id}/`)
      .then((res) => {
        console.log(res);
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  function checkPrev() {
    if (page === 1) {
      return false;
    }
    return true;
  }
  function checkNext() {
    if (preconstructions && page === totalPages) {
      return false;
    }
    return true;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* City Select */}
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white text-gray-700 transition-all"
              id="city"
              value={filters.city}
              onChange={(e) => handleChange(e)}
            >
              <option value="All">All Cities</option>
              {cities &&
                cities.map((city) => (
                  <option key={city.id} value={city.slug}>
                    {city.name}
                  </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
              Select City
            </label>
          </div>

          {/* Project Type Select */}
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white text-gray-700 transition-all"
              id="project_type"
              value={filters.project_type}
              onChange={(e) => handleChange(e)}
            >
              <option value="All">All Types</option>
              <option value="Condo">Condo</option>
              <option value="Townhome">Townhome</option>
              <option value="Detached">Detached</option>
              <option value="Semi-Detached">Semi-Detached</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
              Project Type
            </label>
          </div>

          {/* Status Select */}
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white text-gray-700 transition-all"
              id="status"
              value={filters.status}
              onChange={(e) => handleChange(e)}
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Selling">Selling</option>
              <option value="Sold out">Sold out</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
              Status
            </label>
          </div>

          {/* Add New Button */}
          <div className="flex items-center justify-end">
            <Link
              href="/admin/upload/"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 transform hover:scale-105"
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
              Add New Preconstruction
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          className="btn btn-lg btn-dark"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Previous Page
        </button>
        <span className="font-bold">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-lg btn-dark"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next Page
          <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ListingTable
          preconstructions={preconstructions}
          handleDelete={handleDelete}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
}
