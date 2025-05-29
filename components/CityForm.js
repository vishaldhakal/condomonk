import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CityForm = ({ cityData, setCityData, isEdit, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("details");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCityData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEditorChange = (field, content) => {
    setCityData((prevState) => ({
      ...prevState,
      [field]: content,
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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          City Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="name"
          value={cityData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } py-4 px-1 text-sm font-medium`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "details" && (
          <Editor
            apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            value={cityData.details}
            onEditorChange={(content) => handleEditorChange("details", content)}
          />
        )}
        {activeTab === "condos" && (
          <Editor
            apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            value={cityData.condos_details}
            onEditorChange={(content) =>
              handleEditorChange("condos_details", content)
            }
          />
        )}
        {activeTab === "townhomes" && (
          <Editor
            apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            value={cityData.townhomes_details}
            onEditorChange={(content) =>
              handleEditorChange("townhomes_details", content)
            }
          />
        )}
        {activeTab === "detached" && (
          <Editor
            apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            value={cityData.detached_details}
            onEditorChange={(content) =>
              handleEditorChange("detached_details", content)
            }
          />
        )}
        {activeTab === "upcoming" && (
          <Editor
            apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            value={cityData.upcoming_details}
            onEditorChange={(content) =>
              handleEditorChange("upcoming_details", content)
            }
          />
        )}
      </div>

      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isEdit ? "Update City" : "Create City"}
      </button>
    </form>
  );
};

export default CityForm;
