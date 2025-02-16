import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials) {
  let baseUrl = "https://api.condomonk.ca";
  let fubUrl = "https://api.followupboss.com/v1/events";
  setSubmitbtn("Submitting...");

  // Parse URL to get city and project name
  const path = window.location.pathname.split('/').filter(Boolean);
  let city = null;
  let proj_name = null;

  if (path.length === 1) {
    city = path[0];
  } else if (path.length === 2) {
    city = path[0];
    proj_name = path[1];
  }

  console.log('URL parsed values:', { city, proj_name }); // Debug log

  // Get the root domain name
  const hostname = window.location.hostname;
  let source = 'localhost';
  if (hostname !== 'localhost') {
    const parts = hostname.split('.');
    source = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  }

  let form_data = new FormData();
  form_data.append("name", msgdata.name);
  form_data.append("email", msgdata.email);
  form_data.append("phone", msgdata.phone);
  form_data.append("message", msgdata.message);
  form_data.append("proj_name", msgdata.proj_name);
  form_data.append("realtor", msgdata.realtor);
  form_data.append("cityy", msgdata.city);
  form_data.append("source", source);

  // New form data for homebaba API
  let homebaba_form_data = new FormData();
  homebaba_form_data.append("name", msgdata.name);
  homebaba_form_data.append("email", msgdata.email);
  homebaba_form_data.append("phone", msgdata.phone);
  homebaba_form_data.append("message", msgdata.message);
  homebaba_form_data.append("realtor", msgdata.realtor);
  homebaba_form_data.append("proj_name", proj_name || '');  // Send empty string if null
  homebaba_form_data.append("cityy", city || '');  // Send empty string if null
  homebaba_form_data.append("source", source);

  let url = `${baseUrl}/api/contact-form-submission/`;

  // Follow Up Boss payload
  const fubPayload = {
    person: {
      contacted: false,
      firstName: msgdata.name.split(" ")[0],
      lastName: msgdata.name.split(" ").slice(1).join(" "),
      emails: [{ value: msgdata.email }],
      phones: [{ value: msgdata.phone }],
      tags: [
        msgdata.city,
        msgdata.proj_name,
        msgdata.realtor == "Yes" ? "Agent" : "",
      ],
    },
    source: "condomonk.ca",
    system: "Custom Website",
    type: "Inquiry",
    message: msgdata.message,
  };

  // Function to send data to Follow Up Boss
  const sendToFollowUpBoss = () => {
    return axios.post(fubUrl, fubPayload, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Basic ZmthXzAwTlVCbDF2bGZzRXhyZlZXMmNCYVlqMXJXZzJ6NUNoN2c6",
      },
    });
  };

  // Send all requests in parallel
  Promise.all([
    // Original Condomonk request
    axios.post(url, form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
      mode: "no-cors",
    }).catch(error => {
      console.error('Condomonk API Error:', error);
      throw error;
    }),

    // Homebaba request
    axios.post('https://api.homebaba.ca/api/contact-form-submit/', homebaba_form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "*/*",
      },
      withCredentials: false
    }).catch(error => {
      console.error('Homebaba API Error:', error);
      console.log('Homebaba Form Data:', Object.fromEntries(homebaba_form_data));
      throw error;
    }),

    // Follow Up Boss request
    sendToFollowUpBoss().catch(error => {
      console.error('FUB Error:', error);
      throw error;
    })
  ])
  .then(([condomonkRes, homebabaRes, fubRes]) => {
    console.log('All APIs succeeded');
    console.log('Homebaba response:', homebabaRes);
    
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
    console.error("Final Error:", error);
    setSubmitbtn("Contact Now");
    swal("Message Failed", "Cannot send your message", "error");
  });
}

export default ContactFormSubmit;
