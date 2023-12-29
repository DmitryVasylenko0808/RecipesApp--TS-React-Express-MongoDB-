import React from "react";
import { useGetRecipeDetailsQuery } from "../../../api/recipes/recipesApi";
import { Navigate, useParams } from "react-router";
import Container from "../../../components/Container";
import Rating from "../../../components/Rating";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

import FavoriteIcon from "../../../assets/icons/favorite.svg";
import RateIcon from "../../../assets/icons/rate.svg";
import RateFilledIcon from "../../../assets/icons/rate_filled.svg";
import RecipeDetalsInfo from "./RecipeDetalsInfo";
import RecipeImage from "./RecipeImage";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";
import Box from "./Box";
import RecipeFact from "./RecipeFact";
import RateAnalytics from "./RateAnalytics";

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const { data, isLoading, isError } = useGetRecipeDetailsQuery(recipeId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/" replace />;

  return (
    <div className="p-9">
      <Container>
        <RecipeDetalsInfo recipe={data} />
        <div className="mb-7 flex gap-x-4">
          <Button variant="secondary" onClick={() => {}}>
            <FavoriteIcon width={25} height={25} />
            Favorite
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            <RateIcon width={25} height={25} />
            Rate
          </Button>
        </div>
        {data?.image && <RecipeImage imageSrc={data.image} alt={data.title} />}
        <Box>
          <RecipeFact
            label="Prep Time"
            value={`${data?.prep_time || 0} mins`}
          />
          <RecipeFact
            label="Cook Time"
            value={`${data?.cook_time || 0} mins`}
          />
          <RecipeFact
            label="Total Time"
            value={`${(data?.prep_time || 0) + (data?.cook_time || 0)} mins`}
          />
          <RecipeFact
            label="Servings"
            value={data?.servings.toString() || ""}
          />
        </Box>
        <RecipeIngredients ingredients={data?.ingredients || []} />
        <RecipeSteps steps={data?.directions || []} />
        <Box title="Nutrition Facts">
          <RecipeFact label="Calories" value={`${data?.nutritions.calories}`} />
          <RecipeFact label="Carbs" value={`${data?.nutritions.carbs}`} />
          <RecipeFact label="Fats" value={`${data?.nutritions.fat}`} />
          <RecipeFact label="Proteins" value={`${data?.nutritions.protein}`} />
        </Box>
        {data?.ratings && <RateAnalytics rating={data.ratings} />}
      </Container>
    </div>
  );
};

export default RecipeDetails;
