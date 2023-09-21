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

  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/preconstructions/")
      .then((res) => {
        console.log(res.data.results);
        setPreConstructions(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch]);

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
                aria-label="Floating label select example"
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
                aria-label="Floating label select example"
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
                aria-label="Floating label select example"
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
