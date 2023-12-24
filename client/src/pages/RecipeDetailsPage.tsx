import React from "react";
import { RecipeDetails } from "../modules/RecipeDetails";
import { RecipeReviews } from "../modules/RecipeReviews";

const RecipeDetailsPage = () => {
  return (
    <div>
      <RecipeDetails />
      <RecipeReviews />
    </div>
  );
};

export default RecipeDetailsPage;
