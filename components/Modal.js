'use client'
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import SideContactForm from "@/components/SideContactForm"; // Import SideContactForm component

export default function MyComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent the default behavior of scrolling to the last section
    onOpen(); // Open the modal
  };

  return (
    <div>
      {/* Attach the handleButtonClick function to the onClick event of the button */}
      <Button onClick={handleButtonClick}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <p> 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam pulvinar risus non risus hendrerit venenatis.
              Pellentesque sit amet hendrerit risus, sed porttitor quam.
            </p>
            <SideContactForm /> {/* Place SideContactForm inside ModalBody */}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" onClick={onClose}>
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
