import React, { forwardRef, useEffect, useState } from "react";

import PictureIcon from "../assets/icons/picture.svg";
import {
  BASE_API_URL_AVATARS,
  BASE_API_URL_RECIPE_IMAGES,
} from "../constants/api";

type FileSelectProps = {
  name: React.ComponentProps<"input">["name"];
  variant: "avatar" | "recipe";
  defaultImage?: string;
  label?: string;
  onBlur: React.ComponentProps<"input">["onBlur"];
};

const FileSelect = forwardRef<HTMLInputElement, FileSelectProps>(
  ({ label, defaultImage, variant, ...inputProps }, ref) => {
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
      if (variant === "recipe" && defaultImage) {
        setPreview(`${BASE_API_URL_RECIPE_IMAGES}/${defaultImage}`);
      } else if (variant === "avatar" && defaultImage) {
        setPreview(`${BASE_API_URL_AVATARS}/${defaultImage}`);
      }
    }, []);

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

    let containerClassName =
      "mb-3 border-2 border-dashed border-red flex justify-center items-center text-red";
    if (variant === "avatar") {
      containerClassName += " w-[200px] h-[200px] rounded-full";
    } else if (variant === "recipe") {
      containerClassName += " w-full h-[200px] rounded-lg";
    }

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
          <div className={containerClassName}>
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
        <span className="text-gray-500">Select image for {variant}</span>
      </label>
    );
  }
);

export default FileSelect;
