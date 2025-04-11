import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials) {
  let baseUrl = "https://api.homebaba.ca";
  setSubmitbtn("Submitting...");

  // Parse URL to get city and project name
  const path = window.location.pathname.split("/").filter(Boolean);
  let city = null;
  let proj_name = null;

  if (path.length === 1) {
    city = path[0];
  } else if (path.length === 2) {
    city = path[0];
    proj_name = path[1];
  }

  // Get the full URL of the page
  let fullUrl = "no-url-captured";
  
  if (typeof window !== 'undefined') {
    try {
      // Get the complete URL
      fullUrl = window.location.href;
      console.log("Full URL captured:", fullUrl);
    } catch (error) {
      console.error("Error capturing full URL:", error);
    }
  }

  // Get the root domain name (keeping this for backward compatibility)
  const hostname = window.location.hostname;
  let source = "localhost";
  if (hostname !== "localhost") {
    const parts = hostname.split(".");
    source = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  }

  // Form data for homebaba API
  let form_data = new FormData();
  form_data.append("name", msgdata.name);
  form_data.append("email", msgdata.email);
  form_data.append("phone", msgdata.phone);
  form_data.append("message", msgdata.message);
  form_data.append("realtor", msgdata.realtor);
  form_data.append("proj_name", proj_name || ""); // Send empty string if null
  form_data.append("cityy", city || ""); // Send empty string if null
  form_data.append("source", source);
  form_data.append("full_url", fullUrl); // Add the full URL to the form data

  // Send request to Homebaba API
  axios
    .post(`${baseUrl}/api/contact-form-submit/`, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
      withCredentials: false,
    })
    .then((response) => {
      console.log("Homebaba API Response:", response);
      setSubmitbtn("Successfully Submitted");
      setTimeout(() => {
        setSubmitbtn("Contact Now");
      }, 2000);
      swal(
        `Thank You, ${msgdata.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );
      setCredentials({
        ...msgdata,
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    })
    .catch((error) => {
      console.error("Homebaba API Error:", error);
      console.log("Form Data:", Object.fromEntries(form_data));
      setSubmitbtn("Contact Now");
      swal("Message Failed", "Cannot send your message", "error");
    });
}

export default ContactFormSubmit;
