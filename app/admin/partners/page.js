"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import PartnersTable from "@/components/PartnersTable";

export default function Partners() {
  const initialPartnerState = {
    id: 1,
    name: "",
    image: "",
    brokerage_name: "",
    email: null,
    cities: [],
  };

  const [isEdit, setIsEdit] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [partnerData, setPartnerData] = useState(initialPartnerState);
  const [modalVisible, setModalVisible] = useState(false);
  const [partners, setPartners] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleCreatePartner = (e) => {
    e.preventDefault();
    const { name, image, email, brokerage_name, cities } = partnerData;
    if (!name || !image || !email || !brokerage_name) {
      swal({
        title: "Error!",
        text: "Please fill all the required fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    if (cities.length === 0) {
      swal({
        title: "Error!",
        text: "Please select at least one city!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    axios
      .post("https://api.condomonk.ca/api/partners/", partnerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setRefetch(!refetch);
        setPartnerData(initialPartnerState);
        setSelectedCities([]);
        setModalVisible(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleUpdatePartner = (e) => {
    e.preventDefault();
    const { name, image, email, brokerage_name, cities } = partnerData;
    if (!name || !email || !brokerage_name || cities.length === 0) {
      swal({
        title: "Error!",
        text: "Please fill all the required fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    let updatePartnerData = {};
    if (typeof image === "string") {
      updatePartnerData = { name, email, brokerage_name, selectedCities };
    } else {
      updatePartnerData = {
        name,
        image,
        email,
        brokerage_name,
        selectedCities,
      };
    }

    axios
      .put(
        `https://api.condomonk.ca/api/partners/${partnerData.id}/`,
        updatePartnerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setModalVisible(false);
        setIsEdit(false);
        setRefetch(!refetch);
        swal({
          text: `${partnerData.name} has been updated!`,
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        setPartnerData(initialPartnerState);
        setSelectedCities([]);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleDelete = (e, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this partner!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePartner(id);
        swal({
          text: "Your partner has been deleted!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      } else {
        swal({
          title: "Cancelled",
          text: "Your partner is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  function deletePartner(id) {
    axios
      .delete(`https://api.condomonk.ca/api/partners/${id}/`)
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
      .get("https://api.condomonk.ca/api/partners/")
      .then((res) => {
        console.log(res.data.results);
        setPartners(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });

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
    setPartnerData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEditPartner = (e, id) => {
    e.preventDefault();
    axios
      .get(`https://api.condomonk.ca/api/partners/${id}/`)
      .then((res) => {
        console.log(res.data);
        setModalVisible(true);
        setIsEdit(true);
        setPartnerData(res.data);
        setSelectedCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleImageChange = (e) => {
    let newData = { ...partnerData };
    newData["image"] = e.target.files[0];
    setPartnerData(newData);
  };

  const handleCityChange = (e) => {
    const { checked, value } = e.target;
    const selectedCity = cities.find((city) => city.name === value);

    if (checked) {
      setSelectedCities((prevSelectedCities) => [
        ...prevSelectedCities,
        selectedCity,
      ]);
      setPartnerData((prevPartnerData) => ({
        ...prevPartnerData,
        cities: [...prevPartnerData.cities, selectedCity],
      }));
    } else {
      setSelectedCities((prevSelectedCities) =>
        prevSelectedCities.filter((city) => city.name !== value)
      );
      setPartnerData((prevPartnerData) => ({
        ...prevPartnerData,
        cities: prevPartnerData.cities.filter((city) => city.name !== value),
      }));
    }
  };
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter cities based on search query, excluding selected cities
    const filtered = cities.filter(
      (city) =>
        city.name.toLowerCase().includes(query) &&
        !selectedCities.some((selectedCity) => selectedCity.name === city.name)
    );
    setFilteredCities(filtered);
  };

  return (
    <>
      {modalVisible && (
        <div className="modal">
          <section
            className="modal-main rounded-4"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload Partner</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setModalVisible(false);
                    setPartnerData(initialPartnerState);
                    setSelectedCities([]);
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
                        value={partnerData.name}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="name">
                        Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={partnerData.email}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="email">
                        Email <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="brokerage_name"
                        value={partnerData.brokerage_name}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="brokerage_name">
                        Brokerage Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="w-100">
                      <label>
                        Cities <span className="text-danger">*</span>
                      </label>
                      <div className="py-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search cities..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                          />
                          {selectedCities.map((city) => (
                            <div
                              key={city.id}
                              className="input-group-text bg-success text-white rounded-0"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setSelectedCities((prevSelectedCities) =>
                                  prevSelectedCities.filter(
                                    (c) => c.name !== city.name
                                  )
                                )
                              }
                            >
                              {city.name} &times;
                            </div>
                          ))}
                        </div>
                        <div
                          className="mt-2"
                          style={{ maxHeight: "150px", overflowY: "auto" }}
                        >
                          {searchQuery && filteredCities.length === 0 && (
                            <div>No matching cities found</div>
                          )}
                          {filteredCities.map((city) => (
                            <div key={city.id} className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={city.slug}
                                value={city.name}
                                checked={selectedCities.some(
                                  (c) => c.name === city.name
                                )}
                                onChange={handleCityChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={city.slug}
                              >
                                {city.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="w-100">
                      {isEdit && (
                        <img
                          src={partnerData.image}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                      <label htmlFor="image">
                        {!isEdit && (
                          <>
                            Partner Thumbnail{" "}
                            <span className="text-danger">*</span>
                          </>
                        )}
                        {isEdit && (
                          <>
                            Partner Thumbnail{" "}
                            <span className="text-danger">*</span>
                          </>
                        )}
                      </label>
                      <input
                        type="file"
                        className="form-control py-3"
                        id="image"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {!isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleCreatePartner(e)}
                >
                  Submit
                </button>
              )}
              {isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleUpdatePartner(e)}
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
            <h5 className="fw-bold mb-0">Partners</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button
              className="btn btn-success py-3"
              onClick={() => setModalVisible(true)}
            >
              Add New Partner
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
      <PartnersTable
        partners={partners}
        handleEdit={handleEditPartner}
        handleDelete={handleDelete}
      />
    </>
  );
}
