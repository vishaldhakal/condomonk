"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import EventTable from "@/components/EventTable";
import axios from "axios";
import swal from "sweetalert";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Events() {
  let stat = {
    id: 1,
    event_title: "",
    event_description: "",
    event_date: "",
    event_link: "",
  };
  const [isEdit, setIsEdit] = useState(false);
  const [refetch, setRefetcch] = useState(true);
  const [eventdata, setEventData] = useState(stat);
  const [modalevent, setModalEvent] = useState(false);
  const [events, setEvents] = useState([]);

  const handleCreateEvent = (e) => {
    e.preventDefault();

    if (
      eventdata.event_title == "" ||
      eventdata.event_description == "" ||
      eventdata.event_date == "" ||
      eventdata.event_link == ""
    ) {
      swal({
        title: "Error!",
        text: "Please fill all the fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }
    eventdata.event_date = new Date(eventdata.event_date).toISOString();

    axios
      .post("https://api.condomonk.ca/api/events/", eventdata)
      .then((res) => {
        setRefetcch(!refetch);
        setEventData(stat);
        setModalEvent(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    //handle the empty fields before uploading
    if (
      eventdata.event_title == "" ||
      eventdata.event_description == "" ||
      eventdata.event_date == "" ||
      eventdata.event_link == ""
    ) {
      swal({
        title: "Error!",
        text: "Please fill all the fields!",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    let updateventdata = eventdata;
    axios
      .put(
        `https://api.condomonk.ca/api/events/${eventdata.id}/`,
        updateventdata
      )
      .then((res) => {
        setModalEvent(false);
        setIsEdit(false);
        setRefetcch(!refetch);
        swal({
          text: eventdata.event_title + " has been updated!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        setEventData(stat);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    //Create swal confirmation for confirming delete
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this event!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteEvent(id);
        swal({
          text: "Your event has been deleted!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
      } else {
        swal({
          title: "Cancelled!",
          text: "Your event is safe!",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      }
    });
  };

  function deleteEvent(id) {
    axios
      .delete(`https://api.condomonk.ca/api/events/${id}/`)
      .then((res) => {
        console.log(res);
        setRefetcch(!refetch);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }
  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/events/")
      .then((res) => {
        console.log(res.data.results);
        setEvents(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [refetch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    axios
      .get(`https://api.condomonk.ca/api/events/${id}/`)
      .then((res) => {
        console.log(res.data);
        setModalEvent(true);
        setIsEdit(true);
        setEventData(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      {modalevent && (
        <div className="modal">
          <section className="modal-main rounded-4">
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload Event</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setModalEvent(false);
                    setEventData(stat);
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
                        id="event_title"
                        value={eventdata.event_title}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="event_title">
                        Event Title <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="date"
                        className="form-control"
                        id="event_date"
                        value={eventdata.event_date}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="event_title">
                        Event Date <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="event_link"
                        value={eventdata.event_link}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="event_title">
                        Event Link <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="fw-bold ms-2 mb-1 mt-2">
                      Event Detail <span className="text-danger">*</span>{" "}
                    </p>
                    <ReactQuill
                      theme="snow"
                      value={eventdata.event_description}
                      onChange={(newText) =>
                        setEventData((prevState) => ({
                          ...prevState,
                          ["event_description"]: newText,
                        }))
                      }
                      style={{ height: "250px" }}
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ size: [] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
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
                    />
                  </div>
                </div>
              </div>
              {!isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleCreateEvent(e)}
                >
                  Submit
                </button>
              )}
              {isEdit && (
                <button
                  className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                  onClick={(e) => handleUpdateEvent(e)}
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
            <h5 className="fw-bold mb-0">Events</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button
              className="btn btn-success py-3"
              onClick={() => setModalEvent(true)}
            >
              Add New Event
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
      <EventTable
        events={events}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></EventTable>
    </>
  );
}
