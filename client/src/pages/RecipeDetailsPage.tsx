import React from "react";
import { RecipeDetails } from "../modules/RecipeDetails";
import { RecipeReviews } from "../modules/RecipeReviews";
import { AddReviewForm } from "../modules/AddReviewForm";

const RecipeDetailsPage = () => {
  return (
    <div>
      <RecipeDetails />
      <AddReviewForm />
      <RecipeReviews />
    </div>
  );
};

export default RecipeDetailsPage;
