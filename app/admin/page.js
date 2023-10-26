"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ListingTable from "@/components/ListingTable";
import axios from "axios";
import swal from "sweetalert";

export default function Home() {
  const [filters, setFilters] = useState({
    city: "All",
    status: "All",
    typee: "All",
  });
  const [preconstructions, setPreConstructions] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/preconstructions/?page=" + page)
      .then((res) => {
        console.log(res.data.results);
        setPreConstructions(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 10));
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
    <>
      <div className="py-4 w-100 ">
        <div className="row row-cols-1 row-cols-md-5 d-flex align-items-center mx-0">
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingCity"
                value={filters.city}
                onChange={(e) => handleChange(e)}
                ariaLabel="Floating label select example"
              >
                <option value="All">All</option>
                <option value="Toronto">Toronto</option>
              </select>
              <label htmlFor="floatingCity">Select City</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="typee"
                value={filters.typee}
                onChange={(e) => handleChange(e)}
                ariaLabel="Floating label select example"
              >
                <option value="All">All</option>
                <option value="Condo">Condo</option>
                <option value="Townhome">Townhome</option>
                <option value="Detached">Detached</option>
                <option value="Semi-Detached">Semi-Detached</option>
              </select>
              <label htmlFor="typee">Select Project Type</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="status"
                value={filters.status}
                onChange={(e) => handleChange(e)}
                ariaLabel="Floating label select example"
              >
                <option value="All">All</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Selling">Selling</option>
                <option value="Sold out">Sold out</option>
              </select>
              <label htmlFor="status">Select Status</label>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-end">
            <Link href="/admin/upload/" className="btn btn-success py-3">
              Add New Preconstruction
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-lg btn-dark me-4"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Previous Page
        </button>
        <span className="fw-bold">
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
      <div className="mt-4"></div>
      <ListingTable
        preconstructions={preconstructions}
        handleDelete={handleDelete}
        filters={filters}
        setFilters={setFilters}
      ></ListingTable>
    </>
  );
}
