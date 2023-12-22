import React, { useState } from "react";
import KindsRecipe from "./KindsRecipe";
import { useGetKindsQuery } from "../../../api/recipes/recipesApi";
import KindsRecipeButton from "./KindsRecipeButton";

const MainRecipes = () => {
  const [currentKindRecipeId, setCurrentKindRecipeId] = useState<string>("");

  const kinds = useGetKindsQuery();

  const handleClickKindRecipe = (id: string) => setCurrentKindRecipeId(id);

  return (
    <>
      <KindsRecipe>
        <KindsRecipeButton
          isActive={currentKindRecipeId === ""}
          onClick={() => handleClickKindRecipe("")}
        />
        {kinds.data?.map((k) => (
          <KindsRecipeButton
            kind={k}
            isActive={currentKindRecipeId === k._id}
            onClick={() => handleClickKindRecipe(k._id)}
            key={k._id}
          />
        ))}
      </KindsRecipe>
    </>
  );
};

export default MainRecipes;
