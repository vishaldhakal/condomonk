"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import SideContactForm from "./SideContactForm";
import { Link } from "@nextui-org/react";

export default function CustomModal({
  linkText,
  city,
  proj_name,
  defaultmessage,
  title,
  subtitle,
  image,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {linkText && (
        <span onClick={onOpen} style={{ display: "inline" }}>
          {linkText}
        </span>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="p-6 text-center border-b border-gray-200">
                <h2 className="text-xl font-bold">{title}</h2>
                {subtitle && (
                  <p className="text-sm text-gray-600">{subtitle}</p>
                )}
              </div>
              <ModalBody className="p-6">
                <div className="modal-content">
                  {image && (
                    <img
                      src={image}
                      alt={`${proj_name} image`}
                      className="w-full h-40 object-cover rounded mb-4 mx-auto"
                    />
                  )}
                  <SideContactForm
                    proj_name={proj_name}
                    defaultmessage={defaultmessage}
                    city={city}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
