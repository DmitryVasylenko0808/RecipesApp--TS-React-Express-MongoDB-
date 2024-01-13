import React from "react";
import { Link } from "react-router-dom";

import RecipeIcon from "../../../assets/icons/recipe.svg";

type LogoProps = {
  variant?: "default" | "auth";
};

const Logo: React.FC<LogoProps> = ({ variant = "default" }) => {
  if (variant === "auth") {
    return (
      <Link to="/" className="mb-7 text-center flex items-center gap-x-2">
        <RecipeIcon width={45} height={45} fill="#d14d72" />
        <h1 className="text-3xl font-bold text-red">RecipesApp</h1>
      </Link>
    );
  }

  return (
    <Link to="/" className="flex items-center gap-x-2">
      <RecipeIcon width={45} height={45} fill="white" />
      <h1 className="text-3xl font-bold text-white">RecipesApp</h1>
    </Link>
  );
};

export default Logo;
