"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import Script from "next/script";

export default function Upload() {
  let stat = {
    id: 1,
    project_name: "",
    price_starting_from: 0.0,
    price_to: 0.0,
    project_type: "Condo",
    description: "",
    project_address: "",
    occupancy: "",
    no_of_units: "",
    is_featured: false,
    co_op_available: false,
    status: "Upcoming",
    developer: {
      name: "",
    },
    city: {
      name: "",
    },
  };

  let developer_stat = {
    id: 1,
    name: "",
    phone: "",
    website_link: "",
    details: "",
    image: null,
  };

  const routee = useRouter();
  const [predata, setPredata] = useState(stat);
  const [cities, setCities] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [uploadplans, setUploadPlans] = useState([]);
  const [uploadimages, setUploadImages] = useState([]);
  const [developerdata, setDeveloperData] = useState(developer_stat);
  const [modaldeveloper, setModalDeveloper] = useState(false);

  const handleCreateDeveloper = (e) => {
    e.preventDefault();
    console.log(developerdata);
    if (
      developerdata.name == "" ||
      developerdata.phone == "" ||
      developerdata.website_link == "" ||
      developerdata.details == "" ||
      developerdata.image == null
    ) {
      swal({
        title: "Error!",
        text: "Please fill all the fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }
    axios
      .post("https://api.condomonk.ca/api/developers/", developerdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setRefetch(!refetch);
        setDeveloperData(stat);
        setModalDeveloper(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleImagesChange = (e) => {
    const prevImages = uploadimages;
    const selectedImages = Array.from(e.target.files);
    setUploadImages([...prevImages, ...selectedImages]);
  };

  const handlePlansChange = (e) => {
    const prevPlans = uploadplans;
    const selectedPlans = Array.from(e.target.files);
    setUploadPlans([...prevPlans, ...selectedPlans]);
  };

  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/city/?page_size=100")
      .then((res) => {
        console.log(res.data.results);
        setCities(res.data.results);
        setPredata((prevState) => ({
          ...prevState,
          city: res.data.results[0],
        }));
      })
      .catch((err) => {
        console.log(err.data);
      });

    axios
      .get("https://api.condomonk.ca/api/developers/?page_size=1000")
      .then((res) => {
        console.log(res.data.results);
        setDevelopers(res.data.results);
        setPredata((prevState) => ({
          ...prevState,
          developer: res.data.results[0],
        }));
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPredata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChangeDeveloperData = (e) => {
    const { id, value } = e.target;
    setDeveloperData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    let newData = { ...developerdata };
    newData["image"] = e.target.files[0];
    setDeveloperData(newData);
  };

  const handleChangeCity = (e) => {
    const { id, value } = e.target;
    let mycity = cities.filter((city) => city.name === value);
    let newcity = {
      id: mycity[0].id,
      name: mycity[0].name,
      slug: mycity[0].slug,
    };
    setPredata((prevState) => ({
      ...prevState,
      [id]: newcity,
    }));
  };

  const handleChangeDev = (e) => {
    const { id, value } = e.target;

    let mydev = developers.filter((dev) => dev.name === value);

    setPredata((prevState) => ({
      ...prevState,
      [id]: mydev[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(predata);
    console.log(uploadimages);
    console.log(uploadplans);

    if (
      predata.project_name === "" ||
      predata.project_address === "" ||
      predata.price_starting_from === "" ||
      predata.price_to === "" ||
      predata.project_type === "" ||
      predata.status === "" ||
      predata.city.name === "" ||
      predata.developer.name === "" ||
      predata.occupancy === "" ||
      predata.no_of_units === ""
    ) {
      swal("Please fill all the fields", "", "error");
      return;
    }

    let alldata = {
      predata: predata,
      images: uploadimages,
      plans: uploadplans,
    };

    axios
      .post("https://api.condomonk.ca/api/preconstructions/", alldata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setRefetch(!refetch);
        swal("Project Uploaded Successfully", "", "success");
        setPredata(stat);
        routee.push("/admin/");
      })
      .catch((err) => {
        console.log(err.data);
        swal("Something went wrong", "", "error");
      });
  };

  const handleDeletePlan = (plan) => {
    let newplans = uploadplans.filter((p) => p !== plan);
    setUploadPlans(newplans);
  };

  const handleDeleteImage = (image) => {
    let newimages = uploadimages.filter((p) => p !== image);
    setUploadImages(newimages);
  };

  return (
    <>
      {modaldeveloper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <section className="w-full max-w-4xl bg-white rounded-lg">
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="font-bold">Upload Developer</p>
                <button
                  className="p-1 text-red-500 hover:bg-gray-200 rounded"
                  onClick={() => {
                    setModalDeveloper(false);
                    setDeveloperData(stat);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    id="name"
                    value={developerdata.name}
                    onChange={handleChangeDeveloperData}
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Developer Name <span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    id="phone"
                    value={developerdata.phone}
                    onChange={handleChangeDeveloperData}
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Phone <span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    id="website_link"
                    value={developerdata.website_link}
                    onChange={handleChangeDeveloperData}
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Website Link <span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="col-span-3">
                  <label className="block mb-2">
                    Logo / Banner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-3 border rounded"
                    id="image"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="col-span-3">
                  <p className="font-bold mb-2">
                    About <span className="text-red-500">*</span>
                  </p>
                  <div className="min-h-[200px]">
                    <Editor
                      apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                      value={predata.description}
                      onEditorChange={(newText) =>
                        setPredata((prevState) => ({
                          ...prevState,
                          description: newText,
                        }))
                      }
                      init={{
                        height: 400,
                        menubar: true,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-green-600 transition duration-200"
                onClick={handleCreateDeveloper}
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <Link
              href="/admin/"
              className="px-4 py-3 bg-white shadow rounded hover:bg-gray-50"
            >
              Go Back
            </Link>
            <h4 className="text-xl font-bold">Upload New Pre Construction</h4>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Form Fields */}
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="project_name"
                  value={predata.project_name}
                  onChange={handleChange}
                />
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Project Name <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="project_address"
                  value={predata.project_address}
                  onChange={handleChange}
                />
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Project Address <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="project_type"
                  value={predata.project_type}
                  onChange={handleChange}
                  aria-label="Floating label select example"
                >
                  <option value="Condo">Condo</option>
                  <option value="Townhome">Townhome</option>
                  <option value="Detached">Detached</option>
                  <option value="Semi-Detached">Semi-Detached</option>
                </select>
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Select Type <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="number"
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="0"
                  id="price_starting_from"
                  value={predata.price_starting_from}
                  onChange={handleChange}
                />
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Price From <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="number"
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="0"
                  id="price_to"
                  value={predata.price_to}
                  onChange={handleChange}
                />
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Price To <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="status"
                  value={predata.status}
                  onChange={handleChange}
                  aria-label="Floating label select example"
                >
                  <option value="Selling">Selling</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Archived">Archived</option>
                  <option value="Sold out">Sold out</option>
                  <option value="Planning Phase">Planning Phase</option>
                </select>
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Status <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="co_op_available"
                  value={predata.co_op_available}
                  onChange={handleChange}
                  aria-label="Floating label select example"
                >
                  <option value={false}>Not Available</option>
                  <option value={true}>Available</option>
                </select>
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Co Op
                  <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="is_featured"
                  value={predata.is_featured}
                  onChange={handleChange}
                  ariaLabel="Floating label select example"
                >
                  <option value={false}>Not Featured</option>
                  <option value={true}>Featured</option>
                </select>
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Is Featured ?<span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="0"
                  id="occupancy"
                  value={predata.occupancy}
                  onChange={handleChange}
                />
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Occupancy <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="0"
                  id="no_of_units"
                  value={predata.no_of_units}
                  onChange={handleChange}
                />
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  No of units <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="city"
                  onChange={handleChangeCity}
                  aria-label="Floating label select example"
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Select City <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  list="devs"
                  className="w-full px-3 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="developer"
                  onChange={handleChangeDev}
                />
                <datalist id="devs">
                  <option value="">---</option>
                  {developers &&
                    developers.map((developer) => (
                      <option key={developer.id} value={developer.name}>
                        {developer.name}
                      </option>
                    ))}
                </datalist>
                <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                  Developer <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mt-8 bg-white rounded-lg shadow-md">
              <div className="p-6">
                <p className="text-lg font-bold mb-2">
                  Enter Description about the Project
                </p>
                <p className="text-gray-600 mb-4">
                  The most anticipated preconstruction project in CITY NAME ...
                  [ Summary, Descriptions, Deposite Structure, Amenities ]
                </p>

                <div className="min-h-[400px]">
                  <Editor
                    apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                    value={predata.description}
                    onEditorChange={(newText) =>
                      setPredata((prevState) => ({
                        ...prevState,
                        description: newText,
                      }))
                    }
                    init={{
                      height: 400,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Image Upload Section */}
              <div className="p-6 shadow-lg rounded-lg">
                <label className="block font-bold mb-4">Upload Photos</label>
                <input
                  type="file"
                  multiple
                  className="w-full p-2 border rounded"
                  onChange={handleImagesChange}
                />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {uploadimages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        className="w-full rounded"
                        alt=""
                      />
                      <button
                        className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        onClick={() => handleDeleteImage(image)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plans Upload Section */}
              <div className="p-6 shadow-lg rounded-lg">
                <label className="block font-bold mb-4">Upload Plans</label>
                <input
                  type="file"
                  multiple
                  className="w-full p-2 border rounded"
                  onChange={handlePlansChange}
                />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {uploadplans.map((plan, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(plan)}
                        className="w-full rounded"
                        alt=""
                      />
                      <button
                        className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        onClick={() => handleDeletePlan(plan)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
              <div className="container mx-auto flex justify-center">
                <button
                  className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-green-600 transition duration-200 shadow-lg"
                  onClick={handleSubmit}
                >
                  Upload now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
