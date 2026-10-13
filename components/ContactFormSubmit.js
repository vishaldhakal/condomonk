import { openLeadFollowUp } from "@/helpers/leadFollowUp";

/**
 * Shared handler for the contact forms.
 *
 * Nothing is posted here. The inquiry is handed to the Quick Preferences popup,
 * which sends it once: with the answers on Continue, or without them if the
 * visitor dismisses the popup. Repeat inquiries from the same email / phone on
 * the same day still see the success flow but are not sent again.
 */
function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials) {
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

  const fullUrl = window.location.href;

  openLeadFollowUp({
    userName: msgdata.name || "",
    partnerdata: msgdata.partnerdata || null,
    inquiry: {
      name: msgdata.name || "",
      email: msgdata.email || "",
      phone: msgdata.phone || "",
      message: msgdata.message || "",
      realtor: msgdata.realtor || "No",
      proj_name: proj_name || "",
      cityy: city || "",
      source: fullUrl,
      full_url: fullUrl,
    },
  });

  // Keep the message so the form's default text survives for the next visitor action
  setCredentials({
    ...msgdata,
    name: "",
    phone: "",
    email: "",
  });
}

export default ContactFormSubmit;
