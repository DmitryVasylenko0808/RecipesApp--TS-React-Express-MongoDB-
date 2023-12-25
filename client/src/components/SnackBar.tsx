import React, { useEffect, useState } from "react";

import CloseIcon from "../assets/icons/x.svg";

type SnackBarProps = {
  children: React.ReactNode;
};

const SnackBar: React.FC<SnackBarProps> = ({ children }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setIsShow(true);

    const timer = setTimeout(() => setIsShow(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsShow(false);

  if (!isShow) return null;

  return (
    <div className="absolute z-10 inset-x-0 top-5 w-screen flex justify-center">
      <div className=" min-w-[320px] w-[320px] mx-auto px-6 py-3 flex justify-between items-center gap-x-4 bg-black/60 rounded-lg text-white">
        {children}
        <button onClick={handleClose} className="text-white" aria-label="close">
          <CloseIcon width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default SnackBar;
