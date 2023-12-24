import React from "react";
import { BASE_API_URL_RECIPE_IMAGES } from "../../../constants/api";

type RecipeImageProps = {
  imageSrc?: string;
  alt?: string;
};

const RecipeImage: React.FC<RecipeImageProps> = ({ imageSrc, alt }) => {
  return (
    <div className="m-auto mb-10 max-w-[600px]">
      <img
        src={`${BASE_API_URL_RECIPE_IMAGES}/${imageSrc}`}
        width="100%"
        height="600"
        alt={alt}
        className="shadow-2xl"
      />
    </div>
  );
};

export default RecipeImage;
