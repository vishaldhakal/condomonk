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
        className="modal-custom-styles"
        classNames={{
          backdrop: "modal-custom-backdrop",
        }}
      >
        <ModalContent className="modal-content-custom">
          {(onClose) => (
            <>
              <div className="row align-items-start modal-inner-content">
                <div className="text-center modal-header-custom">
                  <h5 className="fw-bold text-center linem fs-4 mb-0 pt-3">
                    GET PLATINUM ACCESS!!
                  </h5>

                  <p className="mb-0 text-small text-center px-3">
                    Register to Receive Guaranteed Platinum Access & Prices,
                    Incentives & Discounts, Floor Plans & More!
                  </p>
                </div>

                <ModalBody>
                  <SideContactForm
                    proj_name={proj_name}
                    defaultmessage={defaultmessage}
                    city={city}
                  ></SideContactForm>
                </ModalBody>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>

      <style jsx global>{`
        .modal-custom-backdrop {
          background: rgba(255, 255, 255, 0.5) !important;
          backdrop-filter: blur(8px) !important;
        }

        .modal-custom-styles {
          --modal-background: rgba(255, 255, 255, 0.9);
        }

        .modal-content-custom {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          overflow: hidden;
          transform: scale(1);
          transition: transform 0.2s ease;
          animation: modalFadeIn 0.3s ease-out;
        }

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

        .modal-content-custom:hover {
          transform: scale(1.002);
        }

        .modal-inner-content {
          padding: 20px;
        }

        .modal-header-custom {
          background: linear-gradient(145deg, #f3f4f6, #ffffff);
          padding: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .modal-header-custom h5 {
          color: #1a1a1a;
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 700;
        }

        .modal-header-custom p {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .modal-content-custom {
            margin: 10px;
            width: calc(100% - 20px);
          }
        }
      `}</style>
    </>
  );
}
