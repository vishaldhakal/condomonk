import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CityForm = ({ cityData, setCityData, isEdit, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("details");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCityData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleQuillChange = (field, value) => {
    setCityData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cityData);
  };

  const tabs = [
    { id: "details", label: "City Details" },
    { id: "condos", label: "Condos" },
    { id: "townhomes", label: "Townhomes" },
    { id: "detached", label: "Detached" },
    { id: "upcoming", label: "Upcoming" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          City Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={cityData.name}
          onChange={handleChange}
          required
        />
      </div>

      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {activeTab === "details" && (
          <ReactQuill
            theme="snow"
            value={cityData.details}
            onChange={(value) => handleQuillChange("details", value)}
          />
        )}
        {activeTab === "condos" && (
          <ReactQuill
            theme="snow"
            value={cityData.condos_details}
            onChange={(value) => handleQuillChange("condos_details", value)}
          />
        )}
        {activeTab === "townhomes" && (
          <ReactQuill
            theme="snow"
            value={cityData.townhomes_details}
            onChange={(value) => handleQuillChange("townhomes_details", value)}
          />
        )}
        {activeTab === "detached" && (
          <ReactQuill
            theme="snow"
            value={cityData.detached_details}
            onChange={(value) => handleQuillChange("detached_details", value)}
          />
        )}
        {activeTab === "upcoming" && (
          <ReactQuill
            theme="snow"
            value={cityData.upcoming_details}
            onChange={(value) => handleQuillChange("upcoming_details", value)}
          />
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        {isEdit ? "Update City" : "Create City"}
      </button>
    </form>
  );
};

export default CityForm;
