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
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("center");

  return (
    <>
      <Link className="custom-link" onPress={onOpen}>
        {linkText}
      </Link>
      <Modal
        backdrop={"blur"}
        placement={modalPlacement}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="row  align-items-start">
                <div className="text-center">
                  <h5 className="fw-bold text-center linem fs-4  mb-0 pt-3">
                    GET PLATINUM ACCESS!!
                  </h5>

                  <p className="mb-0 text-small  text-center px-3">
                    Register to Receive Guaranteed Platinum Access & Prices,
                    Incentives & Discounts, Floor Plans & More!
                  </p>
                </div>
              </div>

              <ModalBody>
                <SideContactForm
                  proj_name={proj_name}
                  defaultmessage={defaultmessage}
                  city={city}
                ></SideContactForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
