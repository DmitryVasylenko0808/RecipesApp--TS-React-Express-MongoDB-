import React from "react";

import FavoriteIcon from "../assets/icons/favorite.svg";

type FavoriteButtonProps = {
  onFavoriteClick?: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ onFavoriteClick }) => {
  return (
    <button
      className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-red"
      aria-label="favorite"
      onClick={() => onFavoriteClick && onFavoriteClick()}
    >
      <FavoriteIcon width={30} height={30} color="white" />
    </button>
  );
};

export default FavoriteButton;
