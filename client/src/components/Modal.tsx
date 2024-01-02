import React from "react";

import CloseIcon from "../assets/icons/x.svg";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="z-10 fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30">
      <div className="relative p-10 pb-7 rounded-lg bg-white shadow-2xl">
        <button
          className="absolute top-4 right-4 text-gray-500"
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon width={35} height={35} />
        </button>
        <div className="pt-10">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
