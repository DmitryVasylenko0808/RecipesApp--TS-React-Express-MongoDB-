import React from "react";
import { BASE_API_URL_RECIPE_IMAGES } from "../constants/api";
import { Link } from "react-router-dom";

import Rating from "./Rating";
import FavoriteButton from "./FavoriteButton";

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
      <div className="absolute top-4 right-4">
        <FavoriteButton />
      </div>
    </div>
  );
};

export default RecipeCard;
