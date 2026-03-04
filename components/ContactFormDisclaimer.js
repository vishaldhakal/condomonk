export default function ContactFormDisclaimer({
  className = "text-[0.5rem] text-center text-gray-500 mt-2 leading-[0.9rem]",
  linkClassName = "text-red-500",
  ...props
}) {
  return (
    <p {...props} className={className}>
      By submitting this form, you give express written consent to real estate
      agents advertising on Homebaba and its authorized representatives to
      contact you via email, telephone, text message, and other forms of
      electronic communication, including through automated systems, AI
      assistants, or prerecorded messages. Communications from agents may
      include information about real estate services, property listings, market
      updates, or promotions related to your inquiry or expressed interests.
      Homebaba is not a real estate brokerage nor does it participate in any
      transaction. Homebaba is a technology company for agents to advertise. You
      may withdraw your consent at any time by replying “STOP” to text messages
      or clicking “unsubscribe” in emails. Message and data rates may apply. For
      more details, please review our{" "}
      <a href="/privacy" className={linkClassName}>
        Privacy Policy
      </a>{" "}
      &{" "}
      <a href="/privacy" className={linkClassName}>
        Terms of Service
      </a>
      .
    </p>
  );
}
