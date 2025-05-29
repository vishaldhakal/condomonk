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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <section className="bg-white rounded-lg w-full max-w-4xl mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Upload Partner</p>
                <button
                  className="p-1 hover:bg-gray-100 rounded-full text-red-600"
                  onClick={() => {
                    setModalVisible(false);
                    setPartnerData(initialPartnerState);
                    setSelectedCities([]);
                    setIsEdit(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      id="name"
                      value={partnerData.name}
                      onChange={(e) => handleChange(e)}
                      placeholder=" "
                    />
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
                      Name <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      id="email"
                      value={partnerData.email}
                      onChange={(e) => handleChange(e)}
                      placeholder=" "
                    />
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
                      Email <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Brokerage Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      id="brokerage_name"
                      value={partnerData.brokerage_name}
                      onChange={(e) => handleChange(e)}
                      placeholder=" "
                    />
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600">
                      Brokerage Name <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Cities Section */}
                  <div className="col-span-full">
                    <label className="block font-medium text-gray-700 mb-2">
                      Cities <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="text"
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Search cities..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        {selectedCities.map((city) => (
                          <span
                            key={city.id}
                            className="inline-flex items-center px-3 py-1 rounded-md bg-green-600 text-white cursor-pointer"
                            onClick={() =>
                              setSelectedCities((prev) =>
                                prev.filter((c) => c.name !== city.name)
                              )
                            }
                          >
                            {city.name}
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ))}
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {searchQuery && filteredCities.length === 0 && (
                          <div className="text-gray-500 text-sm">
                            No matching cities found
                          </div>
                        )}
                        {filteredCities.map((city) => (
                          <label
                            key={city.id}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              id={city.slug}
                              value={city.name}
                              checked={selectedCities.some(
                                (c) => c.name === city.name
                              )}
                              onChange={handleCityChange}
                            />
                            <span className="text-sm text-gray-700">
                              {city.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="col-span-full md:col-span-1">
                    {isEdit && (
                      <img
                        src={partnerData.image}
                        alt=""
                        className="max-h-32 object-contain mb-2"
                      />
                    )}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Partner Thumbnail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                      id="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>

              <button
                className={`mt-8 w-full px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200 ${
                  !isEdit
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={(e) =>
                  !isEdit ? handleCreatePartner(e) : handleUpdatePartner(e)
                }
              >
                {!isEdit ? "Submit" : "Update Now"}
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Partners</h2>
          <button
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
            onClick={() => setModalVisible(true)}
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
            Add New Partner
          </button>
        </div>

        <div className="mt-6">
          <PartnersTable
            partners={partners}
            handleEdit={handleEditPartner}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
