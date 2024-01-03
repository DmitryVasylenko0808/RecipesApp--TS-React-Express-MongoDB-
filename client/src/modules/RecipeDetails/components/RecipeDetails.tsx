import React, { useState } from "react";
import {
  useFavoriteRecipeMutation,
  useGetRecipeDetailsQuery,
  useUnfavoriteRecipeMutation,
} from "../../../api/recipes/recipesApi";
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
import { useAppDispatch, useAppSelect } from "../../../redux/hooks";
import {
  addFavoriteRecipe,
  unfavoriteRecipe,
} from "../../../redux/slices/favoritesSlice";
import RateRecipeModal from "./RateRecipeModal";
import { useAuth } from "../../../hooks/useAuth";
import { RatingData } from "../../../types";

const RecipeDetails = () => {
  const favorites = useAppSelect((state) => state.favorites);
  const dispatch = useAppDispatch();
  const { recipeId } = useParams();
  const { isAuthenticate, user } = useAuth();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetRecipeDetailsQuery(recipeId);
  const [favoriteRecipeTrigger, { isLoading: isFavoriteRecipeLoading }] =
    useFavoriteRecipeMutation();
  const [unfavoriteRecipeTrigger, { isLoading: isUnfavoriteRecipeLoading }] =
    useUnfavoriteRecipeMutation();

  const handleToggleFavorite = () => {
    if (recipeId) {
      if (!favorites.data.includes(recipeId)) {
        favoriteRecipeTrigger({ id: recipeId })
          .unwrap()
          .then(() => dispatch(addFavoriteRecipe(recipeId)))
          .catch((err) => alert(err.data.message));
      } else {
        unfavoriteRecipeTrigger(recipeId)
          .unwrap()
          .then(() => dispatch(unfavoriteRecipe(recipeId)))
          .catch((err) => alert(err.data.message));
      }
    }
  };

  const checkRatedByUser = (rating: RatingData, userId: string) => {
    for (let k of Object.keys(rating)) {
      if (rating[k as keyof RatingData].includes(userId)) {
        return true;
      }
    }

    return false;
  };

  const handleOpenRateModal = () => setIsOpenModal(true);
  const handleCloseRateModal = () => setIsOpenModal(false);

  const isRatedByUser =
    data && user && checkRatedByUser(data.ratings, user._id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/" replace />;

  return (
    <div className="p-9">
      <Container>
        <RecipeDetalsInfo recipe={data} />
        <div className="mb-7 flex gap-x-4">
          {!favorites.data.includes(recipeId || "") ? (
            <Button
              variant="secondary"
              disabled={isFavoriteRecipeLoading}
              onClick={handleToggleFavorite}
            >
              <FavoriteIcon width={25} height={25} />
              Favorite
            </Button>
          ) : (
            <Button
              variant="secondary"
              disabled={isUnfavoriteRecipeLoading}
              onClick={handleToggleFavorite}
            >
              <FavoriteIcon width={25} height={25} fill="#ffffff" />
              Unfavorite
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={handleOpenRateModal}
            disabled={!!isRatedByUser}
          >
            <RateIcon width={25} height={25} />
            {isRatedByUser ? "Rated" : "Rate"}
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
        {data?.ratings && (
          <RateAnalytics
            rating={data.ratings}
            isRated={!!isRatedByUser}
            onRate={handleOpenRateModal}
          />
        )}
      </Container>
      {isOpenModal && <RateRecipeModal onClose={handleCloseRateModal} />}
    </div>
  );
};

export default RecipeDetails;
