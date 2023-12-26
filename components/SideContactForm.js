"use client";

import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";

export default function SideContactForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };
  return (
    <form
      method="POST"
      className="mb-3"
      onSubmit={(e) => handleFormSubmit(e)}
      id="contactForm"
    >
      <div className="row me-0 row-cols-2 g-1 me-0">
        <div className="col mb-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
            className="fields fff"
          />
        </div>
        <div className="col">
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="realtor"
                aira-label="Floating label select example"
                value={credentials.realtor}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <label htmlFor="floatingSelect">
                Are you a realtor or working with a realtor?{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row me-0">
        <div className="mb-3">
          <textarea
            id="message"
            name="message"
            className="fields fff mess"
            rows="3"
            cols="50"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <input
        type="submit"
        value={submitbtn}
        className="btn bg-dark text-white btn-lg w-100 mb-3"
        id="subbtn"
      />
    </form>
  );
}
