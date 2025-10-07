"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

export default function Update({ params }) {
  let stat = {
    id: 1,
    project_name: "",
    price_starting_from: 0.0,
    price_to: 0.0,
    project_type: "Condo",
    description: "",
    project_address: "",
    is_featured: false,
    occupancy: "",
    no_of_units: "",
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
        /* setPredata((prevState) => ({
          ...prevState,
          city: res.data.results[0],
        })); */
      })
      .catch((err) => {
        console.log(err.data);
      });

    axios
      .get("https://api.condomonk.ca/api/developers/?page_size=1000")
      .then((res) => {
        console.log(res.data.results);
        setDevelopers(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });

    axios
      .get("https://api.condomonk.ca/api/preconstructions/" + params.id + "/")
      .then((res) => {
        setPredata(res.data);
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
      .put(
        `https://api.condomonk.ca/api/preconstructions/${predata.id}/`,
        alldata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
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

  const handleDeleteUploadedImage = (image) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this image!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://api.condomonk.ca/api/delete-image/${image.id}/`)
          .then((res) => {
            console.log(res.data);
            setRefetch(!refetch);
            swal("Image Deleted Successfully", "", "success");
          })
          .catch((err) => {
            console.log(err.data);
            swal("Something went wrong", "", "error");
          });
      } else {
        swal({
          title: "Cancelled!",
          text: "Your image is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  const handleDeleteUploadedPlan = (plan) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this plan!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://api.condomonk.ca/api/delete-floorplan/${plan.id}/`)
          .then((res) => {
            console.log(res.data);
            setRefetch(!refetch);
            swal("Plan Deleted Successfully", "", "success");
          })
          .catch((err) => {
            console.log(err.data);
            swal("Something went wrong", "", "error");
          });
      } else {
        swal({
          title: "Cancelled!",
          text: "Your plan is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  return (
    <>
      {modaldeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <section className="bg-white rounded-lg w-full max-w-4xl">
            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="font-bold">Upload Developer</p>
                <button
                  className="p-1 hover:bg-gray-200 rounded"
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
                    className="text-red-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>

              <div className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="name"
                        value={developerdata.name}
                        onChange={(e) => handleChangeDeveloperData(e)}
                      />
                      <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                        Developer Name <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="phone"
                        value={developerdata.phone}
                        onChange={(e) => handleChangeDeveloperData(e)}
                      />
                      <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                        Phone <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="website_link"
                        value={developerdata.website_link}
                        onChange={(e) => handleChangeDeveloperData(e)}
                      />
                      <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                        Website Link <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="w-full">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Logo / Banner <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        id="image"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <p className="font-semibold text-gray-800 mb-2">
                      About <span className="text-red-500">*</span>{" "}
                    </p>
                    <div className="min-h-[200px]">
                      <TiptapEditor
                        content={developerdata.details}
                        onChange={(newContent) =>
                          setDeveloperData((prevState) => ({
                            ...prevState,
                            details: newContent,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-teal-600 text-white py-3 rounded-lg mt-8 hover:bg-green-600 transition duration-200"
                onClick={(e) => handleCreateDeveloper(e)}
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <Link
              href="/admin/"
              className="px-4 py-3 bg-white shadow-md rounded hover:bg-gray-50"
            >
              Go Back
            </Link>
            <h4 className="font-bold text-xl">Upload New Pre Construction</h4>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="project_name"
                    value={predata.project_name}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="project_address"
                    value={predata.project_address}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Project Address <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="project_type"
                    value={predata.project_type}
                    onChange={(e) => handleChange(e)}
                    ariaLabel="Floating label select example"
                  >
                    <option value="Condo">Condo</option>
                    <option value="Townhome">Townhome</option>
                    <option value="Detached">Detached</option>
                    <option value="Semi-Detached">Semi-Detached</option>
                  </select>
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Select Type <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="col-span-1">
                <div className="relative">
                  <input
                    type="number"
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    id="price_starting_from"
                    value={predata.price_starting_from}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Price From <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <input
                    type="number"
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    id="price_to"
                    value={predata.price_to}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Price To <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="status"
                    value={predata.status}
                    onChange={(e) => handleChange(e)}
                    ariaLabel="Floating label select example"
                  >
                    <option value="Selling">Selling</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Sold out">Sold out</option>
                    <option value="Planning Phase">Planning Phase</option>
                  </select>
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Status <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="co_op_available"
                    value={predata.co_op_available}
                    onChange={(e) => handleChange(e)}
                    ariaLabel="Floating label select example"
                  >
                    <option value={false}>Not Available</option>
                    <option value={true}>Available</option>
                  </select>
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Co Op
                    <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="is_featured"
                    value={predata.is_featured}
                    onChange={(e) => handleChange(e)}
                    ariaLabel="Floating label select example"
                  >
                    <option value={false}>Not Featured</option>
                    <option value={true}>Featured</option>
                  </select>
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Is Featured ?<span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    id="occupancy"
                    value={predata.occupancy}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Occupancy <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    id="no_of_units"
                    value={predata.no_of_units}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    No of units <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="city"
                    value={predata.city.name}
                    onChange={(e) => handleChangeCity(e)}
                    ariaLabel="Floating label select example"
                  >
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Select City <span className="text-red-500">*</span>
                  </label>
                </div>
                {/* <div className="col-12">
                    <button
                      className="btn btn-outline-dark mt-2 w-100"
                      onClick={() => setModalstat(true)}
                    >
                      Add New City
                    </button>
                  </div> */}
              </div>
              <div className="col-span-1">
                <div className="relative">
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="developer"
                    value={predata.developer.name}
                    onChange={(e) => handleChangeDev(e)}
                    ariaLabel="Floating label select example"
                  >
                    {developers &&
                      developers.map((developer) => (
                        <option key={developer.id} value={developer.name}>
                          {developer.name}
                        </option>
                      ))}
                  </select>
                  <label className="absolute -top-2 left-2 bg-gray-50 px-1 text-sm text-gray-600">
                    Developer <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-outline-dark mt-2 w-100"
                    onClick={() => setModalDeveloper(true)}
                  >
                    Add New Developer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <p className="text-lg font-semibold mb-4">
            Enter Description about the Project
          </p>
          <p className="text-gray-600 mb-6">
            The most anticipated preconstruction project in CITY NAME ... [
            Summary, Descriptions, Deposite Structure, Amenities ]
          </p>

          <div className="bg-white border rounded-lg shadow-sm">
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
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pb-6">
            <div className="col-span-1">
              <h5 className="font-bold text-lg mb-3">Uploaded Images</h5>
              <div className="grid grid-cols-3 gap-4">
                {predata.image &&
                  predata.image.map((image) => (
                    <div className="col-span-1" key={image.id}>
                      <img src={image.image} className="w-full rounded-lg" />
                      <button
                        className="mt-2 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200"
                        onClick={() => handleDeleteUploadedImage(image)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-span-1">
              <h5 className="font-bold text-lg mb-3">Uploaded Plans</h5>
              <div className="grid grid-cols-3 gap-4">
                {predata.floorplan &&
                  predata.floorplan.map((plan) => (
                    <div className="col-span-1" key={plan.id}>
                      <img src={plan.floorplan} className="w-full rounded-lg" />
                      <button
                        className="mt-2 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200"
                        onClick={() => handleDeleteUploadedPlan(plan)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 shadow-lg rounded-lg">
              <div className="p-6">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload New Photos
                </label>
                <input
                  type="file"
                  multiple
                  name="images"
                  id="images"
                  onChange={(e) => handleImagesChange(e)}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="col-12 pb-3">
                <div className="grid grid-cols-3 gap-4">
                  {uploadimages &&
                    uploadimages.map((image) => (
                      <div className="col-span-1" key={image.name}>
                        <img
                          src={URL.createObjectURL(image)}
                          className="w-full rounded-lg"
                        />

                        <button
                          className="mt-2 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200"
                          onClick={() => handleDeleteImage(image)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-span-1 shadow-lg rounded-lg">
              <div className="p-6">
                <label
                  htmlFor="plans"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload New Plans
                </label>
                <input
                  type="file"
                  multiple
                  name="plans"
                  id="plans"
                  onChange={(e) => handlePlansChange(e)}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="col-12 pb-3">
                <div className="grid grid-cols-3 gap-4">
                  {uploadplans &&
                    uploadplans.map((plan) => (
                      <div className="col-span-1" key={plan.name}>
                        <img
                          src={URL.createObjectURL(plan)}
                          className="w-full rounded-lg"
                        />

                        <button
                          className="mt-2 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200"
                          onClick={() => handleDeletePlan(plan)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="my-6"></div>
          <div className="mt-8"></div>
          <div className="pt-5"></div>
          <div className="py-3 d-flex justify-content-center align-items-center d-block bg-white w-100 posss">
            <button
              className="btn btn-success btn-lg shadow-lg"
              onClick={(e) => handleSubmit(e)}
            >
              Update now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
