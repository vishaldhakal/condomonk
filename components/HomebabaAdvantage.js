"use client";
import Heading from "@/components/design/Heading";
import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { motion } from "framer-motion";

const HomebabaAdvantage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit Your Interest");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Interested in working with Condomonk",
    realtor: "No",
    project_namee: "",
    cityy: "",
  });

  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/10.jpeg",
    "/gallery/8.jpeg",
    "/gallery/9.jpeg",
    "/gallery/11.jpg",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(formData, setSubmitBtn, setFormData);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-12 md:py-16 px-6 md:px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <Heading
          subtitle="Condomonk hand in hand with leading Pre construction Homes, Condos Developers & Industry Partners"
          align="center"
          maxWidth="100%"
          maxWidthsubtitle="938px"
        >
          The True Canadian Way:
          <br className="block md:hidden" />
          <span className="text-red-600">
            {" "}
            Trust, Innovation & Collaboration
          </span>
        </Heading>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
          {images.slice(0, 6).map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[9/16] overflow-hidden rounded-xl group w-full max-w-[350px]"
            >
              <motion.img
                src={image}
                alt={`Partner ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 rounded-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 justify-center mt-5 md:mt-10 max-w-2xl mx-auto">
          {images.slice(6, 12).map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[9/16] overflow-hidden rounded-xl group w-full"
            >
              <motion.img
                src={image}
                alt={`Partner ${index + 7}`}
                className="object-cover w-full h-full transition-transform duration-300 rounded-xl object-top"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 md:mt-12 flex justify-center"
      >
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black rounded-full text-white px-6 text-lg py-3 transition-colors duration-300 flex items-center gap-2"
        >
          Work With Us{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-[10px] w-full max-w-md relative shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Form */}
            <div className="bg-white rounded-[10px] shadow-large p-6 w-full">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="mt-2">
                  <h2 className="text-2xl font-bold text-center text-gray-900 leading-none">
                    Work With Condomonk
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 text-center">
                    Join our network of trusted builders
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-[14px]"
                    placeholder="Corporation Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-[14px]"
                    placeholder="Email Address"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-[14px]"
                    placeholder="Phone Number"
                  />
                </div>

                <textarea
                  name="message"
                  id="message"
                  placeholder="Tell us about your company and projects..."
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none h-[100px] resize-none text-[14px]"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                <button
                  type="submit"
                  disabled={submitBtn === "Submitting..."}
                  className={`w-full py-4 rounded-xl text-[16px] font-bold transition-all duration-300 shadow-large ${
                    submitBtn === "Submitting..."
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-black text-white hover:bg-black"
                  }`}
                >
                  {submitBtn}
                </button>

                <p className="text-[10px] text-[#6B7280] text-center leading-tight mt-4">
                  By submitting this form, you agree to receive communications
                  from Homebaba Technologies regarding your registration and
                  other services. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HomebabaAdvantage;
