"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PopupManager() {
  const [popups, setPopups] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    PopupName: "",
    PopupTitle: "",
    PopupImage: null,
    popupBuilder: "",
    popupBuilderEmail: "",
    popupCity: [], // Changed to array for multiple cities
    show_popup: false,
    starting_price: "",
  });
  const [editingPopupId, setEditingPopupId] = useState(null);

  // Fetch popups from API
  const fetchPopups = async () => {
    try {
      const response = await fetch("https://admin.homebaba.ca/api/popups/");
      if (response.ok) {
        const data = await response.json();
        setPopups(data);
      }
    } catch (error) {
      console.error("Error fetching popups:", error);
    }
  };

  // Fetch cities from API
  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://admin.homebaba.ca/api/pre-constructions/getcity/devs/"
      );
      if (response.ok) {
        const data = await response.json();
        setCities(data.cities || []);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPopups(), fetchCities()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "popupCity") {
      // Handle multiple city selection
      const cityId = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        popupCity: checked
          ? [...prev.popupCity, cityId]
          : prev.popupCity.filter((id) => id !== cityId),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
      }));
    }
  };

  const handleImageDelete = () => {
    setFormData((prev) => ({
      ...prev,
      PopupImage: null,
    }));
  };

  // Edit handler: load popup data into form
  const handleEdit = (popup) => {
    setFormData({
      PopupName: popup.PopupName || "",
      PopupTitle: popup.PopupTitle || "",
      PopupImage: null,
      popupBuilder: popup.popupBuilder || "",
      popupBuilderEmail: popup.popupBuilderEmail || "",
      popupCity: popup.popupCity || popup.popupCity_ids || [], // Handle both possible field names
      show_popup: popup.show_popup || false,
      starting_price: popup.starting_price || "",
    });
    setEditingPopupId(popup.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("PopupName", formData.PopupName);
    formPayload.append("PopupTitle", formData.PopupTitle);
    formPayload.append("popupBuilder", formData.popupBuilder);
    formPayload.append("popupBuilderEmail", formData.popupBuilderEmail);

    // Send city IDs as JSON array
    formPayload.append("popupCity_ids", JSON.stringify(formData.popupCity));

    formPayload.append("show_popup", formData.show_popup);
    formPayload.append("starting_price", formData.starting_price);
    if (formData.PopupImage) {
      formPayload.append("PopupImage", formData.PopupImage);
    }

    // Debug: log all FormData entries
    for (let pair of formPayload.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      let response;
      if (editingPopupId) {
        // Edit mode: PUT request
        response = await fetch(
          `https://admin.homebaba.ca/api/popups/${editingPopupId}/`,
          {
            method: "PUT",
            body: formPayload,
          }
        );
      } else {
        // Create mode: POST request
        response = await fetch("https://admin.homebaba.ca/api/popups/", {
          method: "POST",
          body: formPayload,
        });
      }
      if (response.ok) {
        await fetchPopups();
      } else {
        const errorData = await response.json();
        console.error("API error:", errorData);
      }
    } catch (error) {
      console.error("Error creating/updating popup:", error);
    }

    setFormData({
      PopupName: "",
      PopupTitle: "",
      PopupImage: null,
      popupBuilder: "",
      popupBuilderEmail: "",
      popupCity: [],
      show_popup: false,
      starting_price: "",
    });
    setEditingPopupId(null);
    setShowForm(false);
  };

  const getCityName = (cityId) => {
    const city = cities.find((c) => c.id === cityId);
    return city ? city.name : "Unknown City";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Popup Management
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your popup campaigns and settings
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add New Popup
            </button>
          </div>
        </div>

        {/* Popup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popups.map((popup) => (
            <div
              key={popup.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Popup Image */}
              <div className="h-48 bg-gray-200 relative">
                {popup.PopupImage ? (
                  <Image
                    src={popup.PopupImage}
                    alt={popup.PopupName}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      popup.show_popup
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {popup.show_popup ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Popup Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {popup.PopupName}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{popup.popupBuilder}</span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{popup.popupBuilderEmail}</span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      {Array.isArray(popup.popupCity || popup.popupCity_ids)
                        ? (popup.popupCity || popup.popupCity_ids)
                            .map((cityId) => getCityName(cityId))
                            .join(", ")
                        : getCityName(popup.popupCity_id || popup.popupCity)}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
                      />
                    </svg>
                    <span>
                      Starting Price:{" "}
                      {popup.starting_price
                        ? `$${popup.starting_price}`
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleEdit(popup)}
                  >
                    Edit
                  </button>
                  <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {popups.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No popups
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new popup.
            </p>
          </div>
        )}

        {/* Add Popup Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingPopupId ? "Edit Popup" : "Add New Popup"}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Popup Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popup Name
                    </label>
                    <input
                      type="text"
                      name="PopupName"
                      value={formData.PopupName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Popup Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popup Title
                    </label>
                    <input
                      type="text"
                      name="PopupTitle"
                      value={formData.PopupTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Popup Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popup Image
                    </label>
                    {formData.PopupImage ? (
                      <div className="mb-2 flex items-center space-x-2">
                        <img
                          src={URL.createObjectURL(formData.PopupImage)}
                          alt="Preview"
                          className="h-20 w-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={handleImageDelete}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                    <input
                      type="file"
                      name="PopupImage"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Builder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Builder Name
                    </label>
                    <input
                      type="text"
                      name="popupBuilder"
                      value={formData.popupBuilder}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Builder Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Builder Email
                    </label>
                    <input
                      type="email"
                      name="popupBuilderEmail"
                      value={formData.popupBuilderEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* City Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cities
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                      {cities.map((city) => (
                        <label
                          key={city.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            name="popupCity"
                            value={city.id}
                            checked={formData.popupCity.includes(city.id)}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            {city.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Select one or more cities for this popup
                    </p>
                  </div>

                  {/* Show Popup Toggle */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="show_popup"
                      checked={formData.show_popup}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Show popup (active)
                    </label>
                  </div>

                  {/* Starting Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Price
                    </label>
                    <input
                      type="number"
                      name="starting_price"
                      value={formData.starting_price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      step="any"
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {editingPopupId ? "Update Popup" : "Create Popup"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
