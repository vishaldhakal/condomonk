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
  openOnMount = false,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  React.useEffect(() => {
    if (openOnMount) {
      onOpen();
    }
  }, [openOnMount, onOpen]);

  return (
    <>
      {linkText && (
        <Link
          className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onPress={onOpen}
        >
          {linkText}
        </Link>
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
                <p className="text-sm text-gray-600">
                  Register to Receive Platinum Access & More!
                </p>
              </div>
              <ModalBody className="p-6">
                <SideContactForm
                  proj_name={proj_name}
                  defaultmessage={defaultmessage}
                  city={city}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
