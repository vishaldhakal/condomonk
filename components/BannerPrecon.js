"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomModal from "@/components/Modal";
import ContactFormSubmit from "@/components/ContactFormSubmit";
import { motion } from "framer-motion";

export default function BannerPrecon({
  projectName,
  developer,
  project_type = "pre-construction",
  city = "Ontario",
}) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    realtor: "No",
    project_namee: projectName || "Pre construction Homes",
    cityy: city,
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.1 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitBtn, setCredentials);
    const timer = setTimeout(() => {
      setShowContactModal(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handleReserveNow = () => {
    setCredentials((prev) => ({
      ...prev,
      message: `Please send me the latest information about ${projectName}. Thank you`,
    }));
    setShowContactModal(true);
  };

  return (
    <section className="relative max-w-5xl mx-auto bg-gradient-to-r from-blue-50 via-white to-pink-50 my-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />

      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-pink-100 opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Project Image */}
          <motion.div
            custom={0}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2"
          >
            <div className="relative w-full h-[300px] md:h-[360px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/standline.webp"
                alt="People waiting in line"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            custom={1}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6"
          >
            <div>
              <h2 className="text-2xl font-normal text-gray-800">
                Why wait in Line?
              </h2>
              <h3 className="text-xl font-extrabold text-black mt-2">
                Get {projectName} Latest Info
              </h3>
            </div>

            <CustomModal
              linkText={
                <button className="bg-black text-white font-bold py-3 px-8 rounded-full text-md transition-all duration-300 transform hover:scale-105 hover:bg-black uppercase tracking-wider shadow-xl border-2 border-black">
                  {" "}
                  GET FIRST ACCESS
                </button>
              }
              projectName
              defaultmessage={`Please send me the latest information about ${projectName}. Thank you`}
              city
            />

            {/* Developer Info */}
            <div className="flex flex-col items-center space-y-4 mt-4">
              <div className="px-3 text-center text-xs text-slate-700 space-y-2">
                <p className="mb-2">
                  {projectName} is one of the{" "}
                  <Link
                    href={`/${city?.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 hover:text-gray-700 underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project_type?.toLowerCase()} homes in {city}
                  </Link>{" "}
                  by{" "}
                  <Link
                    href={`/builders/${developer?.name
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-gray-600 hover:text-gray-700 underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {developer?.name || "renowned developer"}
                  </Link>
                </p>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gray-700 underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse our curated guides for buyers
                </Link>
              </div>

              {developer?.image && (
                <div className="relative w-48 h-24">
                  <Image
                    src={`https://api.condomonk.ca${developer.image}`}
                    alt={`${developer.name} Logo`}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
