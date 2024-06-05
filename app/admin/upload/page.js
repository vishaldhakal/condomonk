"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Upload() {
  const initialState = {
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
    developer: { name: "" },
    city: { name: "" },
  };

  const initialDeveloperState = {
    id: 1,
    name: "",
    phone: "",
    website_link: "",
    details: "",
    image: null,
  };

  const router = useRouter();
  const [predata, setPredata] = useState(initialState);
  const [cities, setCities] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [uploadPlans, setUploadPlans] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [developerData, setDeveloperData] = useState(initialDeveloperState);
  const [modalDeveloper, setModalDeveloper] = useState(false);

  const handleCreateDeveloper = (e) => {
    e.preventDefault();
    if (
      !developerData.name ||
      !developerData.phone ||
      !developerData.website_link ||
      !developerData.details ||
      !developerData.image
    ) {
      swal("Error!", "Please fill all the fields!", "error");
      return;
    }
    axios
      .post("https://api.condomonk.ca/api/developers/", developerData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setRefetch(!refetch);
        setDeveloperData(initialDeveloperState);
        setModalDeveloper(false);
      })
      .catch((err) => console.error(err));
  };

  const handleImagesChange = (e) => {
    setUploadImages([...uploadImages, ...Array.from(e.target.files)]);
  };

  const handlePlansChange = (e) => {
    setUploadPlans([...uploadPlans, ...Array.from(e.target.files)]);
  };

  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/city/")
      .then((res) => {
        setCities(res.data.results);
        setPredata((prev) => ({ ...prev, city: res.data.results[0] }));
      })
      .catch((err) => console.error(err));

    axios
      .get("https://api.condomonk.ca/api/developers/")
      .then((res) => {
        setDevelopers(res.data.results);
        setPredata((prev) => ({ ...prev, developer: res.data.results[0] }));
      })
      .catch((err) => console.error(err));
  }, [refetch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPredata((prev) => ({ ...prev, [id]: value }));
  };

  const handleChangeDeveloperData = (e) => {
    const { id, value } = e.target;
    setDeveloperData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    setDeveloperData({ ...developerData, image: e.target.files[0] });
  };

  const handleChangeCity = (e) => {
    const selectedCity = cities.find((city) => city.name === e.target.value);
    setPredata((prev) => ({ ...prev, city: selectedCity }));
  };

  const handleChangeDev = (e) => {
    const selectedDeveloper = developers.find(
      (dev) => dev.name === e.target.value
    );
    setPredata((prev) => ({ ...prev, developer: selectedDeveloper }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !predata.project_name ||
      !predata.project_address ||
      !predata.price_starting_from ||
      !predata.price_to ||
      !predata.project_type ||
      !predata.status ||
      !predata.city.name ||
      !predata.developer.name ||
      !predata.occupancy ||
      !predata.no_of_units
    ) {
      swal("Please fill all the fields", "", "error");
      return;
    }

    const alldata = {
      predata,
      images: uploadImages,
      plans: uploadPlans,
    };

    axios
      .post("https://api.condomonk.ca/api/preconstructions/", alldata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setRefetch(!refetch);
        swal("Project Uploaded Successfully", "", "success");
        setPredata(initialState);
        router.push("/admin/");
      })
      .catch((err) => {
        console.error(err);
        swal("Something went wrong", "", "error");
      });
  };

  const handleDeletePlan = (plan) => {
    setUploadPlans(uploadPlans.filter((p) => p !== plan));
  };

  const handleDeleteImage = (image) => {
    setUploadImages(uploadImages.filter((p) => p !== image));
  };

  return (
    <>
      {modalDeveloper && (
        <div className="modal">
          <section className="modal-main rounded-4">
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload Developer</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setModalDeveloper(false);
                    setDeveloperData(initialDeveloperState);
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
                        value={developerData.name}
                        onChange={handleChangeDeveloperData}
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
                        value={developerData.phone}
                        onChange={handleChangeDeveloperData}
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
                        value={developerData.website_link}
                        onChange={handleChangeDeveloperData}
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
                        onChange={handleImageChange}
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
                      value={developerData.details}
                      onChange={handleChangeDeveloperData}
                    ></textarea>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-primary bg-col-primary py-3 px-4 w-100"
                      onClick={handleCreateDeveloper}
                    >
                      Create Developer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <section className="d-flex justify-content-between">
        <div>
          <p className="fs-1 fw-bold">Create New Preconstruction</p>
          <p className="fs-6 text-secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
            tempora.
          </p>
        </div>
        <Link href="/admin/">
          <button className="btn btn-primary bg-col-primary p-3 px-5 rounded-3">
            Back
          </button>
        </Link>
      </section>

      <form onSubmit={handleSubmit}>
        <div className="row row-cols-1 row-cols-md-2 gy-4">
          <div className="col-4">
            <div className="form-floating w-100">
              <input
                type="text"
                className="form-control"
                id="project_name"
                value={predata.project_name}
                onChange={handleChange}
              />
              <label htmlFor="project_name">
                Project Name <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4">
            <div className="form-floating w-100">
              <select
                id="city"
                className="form-select"
                value={predata.city.name}
                onChange={handleChangeCity}
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <label htmlFor="city">
                City <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4">
            <div className="form-floating w-100">
              <select
                id="developer"
                className="form-select"
                value={predata.developer.name}
                onChange={handleChangeDev}
              >
                {developers.map((developer) => (
                  <option key={developer.id} value={developer.name}>
                    {developer.name}
                  </option>
                ))}
              </select>
              <label htmlFor="developer">
                Developer <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4">
            <div className="form-floating w-100">
              <input
                type="number"
                className="form-control"
                id="price_starting_from"
                value={predata.price_starting_from}
                onChange={handleChange}
              />
              <label htmlFor="price_starting_from">
                Price Starting From <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4">
            <div className="form-floating w-100">
              <input
                type="number"
                className="form-control"
                id="price_to"
                value={predata.price_to}
                onChange={handleChange}
              />
              <label htmlFor="price_to">
                Price To <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4">
            <div className="form-floating w-100">
              <select
                id="project_type"
                className="form-select"
                value={predata.project_type}
                onChange={handleChange}
              >
                <option value="Condo">Condo</option>
                <option value="Townhome">Townhome</option>
              </select>
              <label htmlFor="project_type">
                Project Type <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4">
            <div className="form-floating w-100">
              <select
                id="status"
                className="form-select"
                value={predata.status}
                onChange={handleChange}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
              <label htmlFor="status">
                Status <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4">
            <div className="form-floating w-100">
              <input
                type="text"
                className="form-control"
                id="occupancy"
                value={predata.occupancy}
                onChange={handleChange}
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
                id="no_of_units"
                value={predata.no_of_units}
                onChange={handleChange}
              />
              <label htmlFor="no_of_units">
                No of Units <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-4 d-flex align-items-center">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="is_featured"
                checked={predata.is_featured}
                onChange={() =>
                  setPredata((prev) => ({
                    ...prev,
                    is_featured: !prev.is_featured,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="is_featured">
                Featured
              </label>
            </div>
          </div>

          <div className="col-4 d-flex align-items-center">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="co_op_available"
                checked={predata.co_op_available}
                onChange={() =>
                  setPredata((prev) => ({
                    ...prev,
                    co_op_available: !prev.co_op_available,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="co_op_available">
                Co-Op Available
              </label>
            </div>
          </div>

          <div className="col-12">
            <p className="fw-bold mb-1 mt-2">
              Description <span className="text-danger">*</span>
            </p>
            <ReactQuill
              value={predata.description}
              onChange={(value) =>
                setPredata((prev) => ({ ...prev, description: value }))
              }
            />
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="uploadImages">Upload Images</label>
            <input
              type="file"
              id="uploadImages"
              multiple
              onChange={handleImagesChange}
            />
            <div className="d-flex mt-2">
              {uploadImages.map((image, index) => (
                <div key={index} className="position-relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="uploaded"
                    className="me-2"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0"
                    onClick={() => handleDeleteImage(image)}
                  ></button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="uploadPlans">Upload Floor Plans</label>
            <input
              type="file"
              id="uploadPlans"
              multiple
              onChange={handlePlansChange}
            />
            <div className="d-flex mt-2">
              {uploadPlans.map((plan, index) => (
                <div key={index} className="position-relative">
                  <div className="me-2">
                    {plan.name}
                    <button
                      type="button"
                      className="btn-close position-absolute top-0 end-0"
                      onClick={() => handleDeletePlan(plan)}
                    ></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-4 mt-5">
          <button
            type="button"
            className="btn btn-primary bg-col-primary py-3 px-4 w-100"
            onClick={() => setModalDeveloper(true)}
          >
            Create New Developer
          </button>
        </div>

        <div className="col-4 mt-5">
          <button
            type="submit"
            className="btn btn-primary bg-col-primary py-3 px-4 w-100"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
