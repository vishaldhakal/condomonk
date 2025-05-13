"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import SideContactForm from "./SideContactForm";

export default function CustomModal({
  linkText,
  city,
  proj_name,
  defaultmessage,
  title,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("center");

  return (
    <>
      <Link
        className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
        onPress={onOpen}
      >
        {linkText}
      </Link>
      <Modal
        backdrop={"blur"}
        placement={modalPlacement}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-white/50 backdrop-blur-md",
          base: "bg-white/90",
          body: "p-0",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        className="max-w-md mx-auto"
      >
        <ModalContent className="bg-white rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 overflow-hidden transform transition-all duration-200 ease-out animate-modalFadeIn hover:scale-[1.002]">
          {(onClose) => (
            <div className="flex flex-col">
              <div className="text-center bg-gradient-to-br from-gray-50 to-white p-6 border-b border-gray-100">
                <h5 className="font-bold text-2xl text-gray-900 mb-2">
                  {title || "GET PLATINUM ACCESS!!"}
                </h5>
                <p className="text-sm text-gray-600 px-4">
                  Register to Receive Guaranteed Platinum Access & Prices,
                  Incentives & Discounts, Floor Plans & More!
                </p>
              </div>

              <ModalBody className="p-6">
                <SideContactForm
                  proj_name={proj_name}
                  defaultmessage={defaultmessage}
                  city={city}
                />
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
