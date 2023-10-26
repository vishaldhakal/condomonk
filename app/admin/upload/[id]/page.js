"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Update({ params }) {
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
      .get("https://api.condomonk.ca/api/city/")
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
      .get("https://api.condomonk.ca/api/developers/")
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
        <div className="modal">
          <section className="modal-main rounded-4">
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload Developer</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setModalDeveloper(false);
                    setDeveloperData(stat);
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
                        value={developerdata.name}
                        onChange={(e) => handleChangeDeveloperData(e)}
                      />
                      <label htmlFor="name">
                        Developer Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={developerdata.phone}
                        onChange={(e) => handleChangeDeveloperData(e)}
                      />
                      <label htmlFor="phone">
                        Phone <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="website_link"
                        value={developerdata.website_link}
                        onChange={(e) => handleChangeDeveloperData(e)}
                      />
                      <label htmlFor="website_link">
                        Website Link <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="w-100">
                      <label htmlFor="image">
                        Logo / Banner <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="fw-bold mb-1 mt-2">
                      About <span className="text-danger">*</span>{" "}
                    </p>
                    <textarea
                      name="details"
                      id="details"
                      rows={8}
                      className="textbox w-100"
                      defaultValue={developerdata.details}
                      onChange={(e) => handleChangeDeveloperData(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                onClick={(e) => handleCreateDeveloper(e)}
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      )}
      <div className="bg-white">
        <div className="container-fluid px-minn">
          <div className="d-flex justify-content-between pt-5">
            <Link href="/admin/" className="btn bg-white shadow">
              Go Back
            </Link>
            <h4 className="fw-bold">Upload New Pre Construction</h4>
          </div>
        </div>
        <div className="container-fluid px-minn py-5 mydetaill">
          <div className="row row-cols-2 bg-light py-5 px-3 rounded-mine">
            <div className="col-12">
              <div className="row row-cols-2 gy-4">
                <div className="col-4">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      id="project_name"
                      value={predata.project_name}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="projectname">
                      Project Name <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      id="project_address"
                      value={predata.project_address}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="projectaddress">
                      Project Address <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
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
                    <label htmlFor="floatingSelect2">
                      Select Type <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-floating w-100">
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      id="price_starting_from"
                      value={predata.price_starting_from}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="pricefrom">
                      Price From <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      id="price_to"
                      value={predata.price_to}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="priceto">
                      Price To <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
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
                    <label htmlFor="developer">
                      Status <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
                      id="co_op_available"
                      value={predata.co_op_available}
                      onChange={(e) => handleChange(e)}
                      ariaLabel="Floating label select example"
                    >
                      <option value={false}>Not Available</option>
                      <option value={true}>Available</option>
                    </select>
                    <label htmlFor="co_op_available">
                      Co Op
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      min="0"
                      id="occupancy"
                      value={predata.occupancy}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="occupancy">
                      Occupancy <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control"
                      min="0"
                      id="no_of_units"
                      value={predata.no_of_units}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="no_of_units">
                      No of units <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
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
                    <label htmlFor="floatingSelect">
                      Select City <span className="text-danger">*</span>
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
                <div className="col-4">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
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
                    <label htmlFor="developer">
                      Developer <span className="text-danger">*</span>
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
        </div>
        <div className="container-fluid px-minn pb-5 mydetaill">
          <p className="fs-5 fw-bold">Enter Description about the Project</p>
          <p className="my-3">
            The most anticipated preconstruction project in CITY NAME ... [
            Summary, Descriptions, Deposite Structure, Amenities ]
          </p>
          <ReactQuill
            theme="snow"
            value={predata.description}
            style={{ height: "550px", marginBottom: "80px" }}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
              clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "link",
              "image",
              "video",
            ]}
            onChange={(newText) =>
              setPredata((prevState) => ({
                ...prevState,
                ["description"]: newText,
              }))
            }
          />
          <div className="row row-cols-2 pt-4 pb-3">
            <div className="col-6 pb-3">
              <h5 className="fw-bold">Uploaded Images</h5>
              <div className="row row-cols-3">
                {predata.image &&
                  predata.image.map((image) => (
                    <div className="col-4">
                      <img src={image.image} className="img-fluid" />
                      <button
                        className="btn btn-sm btn-danger mt-2"
                        onClick={() => handleDeleteUploadedImage(image)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-6 pb-3">
              <h5 className="fw-bold">Uploaded Plans</h5>
              <div className="row row-cols-3">
                {predata.floorplan &&
                  predata.floorplan.map((plan) => (
                    <div className="col-4">
                      <img src={plan.floorplan} className="img-fluid" />
                      <button
                        className="btn btn-sm btn-danger mt-2"
                        onClick={() => handleDeleteUploadedPlan(plan)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="row row-cols-2 pt-4 pb-3">
            <div className="col shadow-lg">
              <div className="py-3">
                <label htmlFor="images" className="fw-bold">
                  Upload New Photos
                </label>
                <br />
                <br />
                <input
                  type="file"
                  multiple
                  name="images"
                  id="images"
                  onChange={(e) => handleImagesChange(e)}
                />
              </div>
              <div className="col-12 pb-3">
                <div className="row row-cols-3">
                  {uploadimages &&
                    uploadimages.map((image) => (
                      <div className="col-4">
                        <img
                          src={URL.createObjectURL(image)}
                          className="img-fluid"
                        />

                        <button
                          className="btn btn-sm btn-danger mt-2"
                          onClick={() => handleDeleteImage(image)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col shadow-lg">
              <div className="py-3">
                <label htmlFor="plans" className="fw-bold">
                  Upload New Plans
                </label>
                <br />
                <br />
                <input
                  type="file"
                  multiple
                  name="plans"
                  id="plans"
                  onChange={(e) => handlePlansChange(e)}
                />
              </div>
              <div className="col-12 pb-3">
                <div className="row row-cols-3">
                  {uploadplans &&
                    uploadplans.map((plan) => (
                      <div className="col-4">
                        <img
                          src={URL.createObjectURL(plan)}
                          className="img-fluid"
                        />

                        <button
                          className="btn btn-sm btn-danger mt-2"
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
          <div className="my-3"></div>
          <div className="mt-5"></div>
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
