import React from "react";
import { GetRecipesDTO } from "../api/recipes/dto/get-recipes";
import RecipeCard from "./RecipeCard";

type RecipesListProps = {
  recipes: GetRecipesDTO;
};

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  return (
    <div className="px-12 py-7">
      <div className="flex flex-wrap gap-x-[82px] gap-y-8">
        {recipes.map((r) => (
          <RecipeCard recipe={r} key={r._id} />
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
