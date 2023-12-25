import React, { forwardRef, useState } from "react";

import PictureIcon from "../assets/icons/picture.svg";

type FileSelectProps = {
  name: React.ComponentProps<"input">["name"];
  label?: string;
  onBlur: React.ComponentProps<"input">["onBlur"];
};

const FileSelect = forwardRef<HTMLInputElement, FileSelectProps>(
  ({ label, ...inputProps }, ref) => {
    const [preview, setPreview] = useState<string>("");

    const handleShowPreview = (
      e: React.ChangeEvent,
      files: FileList | null
    ) => {
      e.preventDefault();

      const imgFile = files && files[0];
      if (imgFile) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setPreview(reader.result as string);
        });
        reader.readAsDataURL(imgFile);
      }
    };

    return (
      <label className="py-2 flex flex-col items-center cursor-pointer">
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            width="200"
            height="200"
            className="mb-3 rounded-full"
          />
        ) : (
          <div className="w-[200px] h-[200px] mb-3 border-2 border-dashed border-red rounded-full flex justify-center items-center text-red">
            <PictureIcon width={50} height={50} fill="#d14d72" />
          </div>
        )}
        <input
          type="file"
          className="outline-0 w-0 h-0 opacity-0"
          {...inputProps}
          ref={ref}
          onChange={(e) => handleShowPreview(e, e.target.files)}
        />
        <span className="text-gray-500">Select image for avatar</span>
      </label>
    );
  }
);

export default FileSelect;
