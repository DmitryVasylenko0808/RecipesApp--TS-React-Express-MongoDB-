import React from "react";
import { BASE_API_URL_RECIPE_IMAGES } from "../constants/api";
import { Link } from "react-router-dom";

import FavoriteIcon from "../assets/icons/favorite.svg";
import Rating from "./Rating";

type Kind = {
  _id: string;
  title: string;
};

type Recipe = {
  _id: string;
  title: string;
  kind: Kind;
  date: Date | string;
  image?: string;
  ratings: {
    "1": string[];
    "2": string[];
    "3": string[];
    "4": string[];
    "5": string[];
  };
};

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="relative w-[380px] h-[400px] pb-3 bg-white border-2 duration-300 hover:shadow-2xl">
      <Link to={`/${recipe._id}`}>
        <img
          src={`${BASE_API_URL_RECIPE_IMAGES}/${recipe.image}`}
          alt={recipe.title}
          className="mb-4 w-full h-[250px]"
        />
      </Link>
      <div className="px-4">
        <div className="mb-1 text-sm text-gray-400 font-bold">
          {recipe.kind.title.toUpperCase()}
        </div>
        <Link to={`/${recipe._id}`} className="mb-2 inline-block">
          <h3 className="inline text-xl font-bold">{recipe.title}</h3>
        </Link>
        <Rating rating={recipe.ratings} />
      </div>
      <button
        className="absolute top-4 right-4 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-red"
        aria-label="favorite"
      >
        <FavoriteIcon width={30} height={30} color="white" />
      </button>
    </div>
  );
};

export default RecipeCard;
