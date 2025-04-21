import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials) {
  let baseUrl = "https://admin.homebaba.ca";
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

  if (typeof window !== "undefined") {
    try {
      // Get the complete URL
      fullUrl = window.location.href;
      console.log("Full URL captured:", fullUrl);
    } catch (error) {
      console.error("Error capturing full URL:", error);
    }
  }

  // Use the full URL as the source as well to ensure it's being sent correctly
  let source = fullUrl;

  // Log all the data we're about to send
  console.log("Form submission data:");
  console.log("- Full URL:", fullUrl);
  console.log("- Source:", source);
  console.log("- City:", city);
  console.log("- Project Name:", proj_name);

  // Form data for homebaba API
  let form_data = new FormData();
  form_data.append("name", msgdata.name);
  form_data.append("email", msgdata.email);
  form_data.append("phone", msgdata.phone);
  form_data.append("message", msgdata.message);
  form_data.append("realtor", msgdata.realtor);
  form_data.append("proj_name", proj_name || ""); // Send empty string if null
  form_data.append("cityy", city || ""); // Send empty string if null
  form_data.append("source", source); // Now using full URL as source
  form_data.append("full_url", fullUrl); // Add the full URL to the form data

  // Log the FormData entries to verify what's being sent
  console.log("FormData entries:");
  for (let pair of form_data.entries()) {
    console.log(`- ${pair[0]}: ${pair[1]}`);
  }

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
