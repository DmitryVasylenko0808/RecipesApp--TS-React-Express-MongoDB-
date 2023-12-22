import React from "react";
import { Link } from "react-router-dom";

import RecipeIcon from "../../../assets/icons/recipe.svg";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-x-2">
      <RecipeIcon width={45} height={45} fill="white" />
      <h1 className="text-3xl font-bold text-white">RecipesApp</h1>
    </Link>
  );
};

export default Logo;
