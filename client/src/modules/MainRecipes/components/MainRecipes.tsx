import React, { useEffect, useState } from "react";
import KindsRecipe from "./KindsRecipe";
import {
  useGetKindsQuery,
  useGetRecipesQuery,
} from "../../../api/recipes/recipesApi";
import KindsRecipeButton from "./KindsRecipeButton";
import { useSearchParams } from "react-router-dom";
import RecipesList from "../../../components/RecipesList";
import Container from "../../../components/Container";

const MainRecipes = () => {
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortDate = searchParams.get("sortDate") || "-1";
  const kind = searchParams.get("kind") || "";

  const kinds = useGetKindsQuery();
  const recipes = useGetRecipesQuery({
    page,
    sortDate,
    kind,
  });

  useEffect(() => {
    setSearchParams({
      sortDate,
      kind,
    });
  }, []);

  const handleClickKindRecipe = (id: string) => {
    setSearchParams({ sortDate, kind: id });
  };

  return (
    <>
      <KindsRecipe>
        <KindsRecipeButton
          isActive={kind === ""}
          onClick={() => handleClickKindRecipe("")}
        />
        {kinds.data?.map((k) => (
          <KindsRecipeButton
            kind={k}
            isActive={kind === k._id}
            onClick={() => handleClickKindRecipe(k._id)}
            key={k._id}
          />
        ))}
      </KindsRecipe>
      <Container>
        <RecipesList recipes={recipes.data || []} title="Recipes List" />
      </Container>
    </>
  );
};

export default MainRecipes;
