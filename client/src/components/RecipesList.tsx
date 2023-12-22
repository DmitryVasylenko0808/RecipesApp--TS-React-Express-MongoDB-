import React from "react";
import { GetRecipesDTO } from "../api/recipes/dto/get-recipes";
import RecipeCard from "./RecipeCard";

type RecipesListProps = {
  recipes: GetRecipesDTO;
  title?: string;
  children?: React.ReactNode;
};

const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  title,
  children,
}) => {
  return (
    <div className="px-12 py-7">
      {title && (
        <h2 className="mb-7 text-2xl font-bold text-center">{title}</h2>
      )}
      <div className="flex justify-end">{children}</div>
      <div className="flex flex-wrap gap-x-[82px] gap-y-8">
        {recipes.map((r) => (
          <RecipeCard recipe={r} key={r._id} />
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
