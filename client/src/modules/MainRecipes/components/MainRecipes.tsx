import React, { useEffect, useState } from "react";
import KindsRecipe from "./KindsRecipe";
import {
  useGetKindsQuery,
  useLazyGetRecipesQuery,
} from "../../../api/recipes/recipesApi";
import KindsRecipeButton from "./KindsRecipeButton";
import { useSearchParams } from "react-router-dom";
import RecipesList from "../../../components/RecipesList";
import Container from "../../../components/Container";
import { GetRecipesDTO } from "../../../api/recipes/dto/get-recipes";
import { Option } from "../../../types";
import Select from "../../../components/Select";

const MainRecipes = () => {
  const [page, setPage] = useState<number>(1);
  const [recipes, setRecipes] = useState<GetRecipesDTO>([]);
  const [sortDateOptions, setSortDateOptions] = useState<Option[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortDate = searchParams.get("sortDate") || "-1";
  const kind = searchParams.get("kind") || "";

  const fetchedKinds = useGetKindsQuery();
  const [getRecipes, fetchedRecipes] = useLazyGetRecipesQuery();

  useEffect(() => {
    const options = [
      { name: "Newest", value: "-1", selected: true },
      { name: "Oldest", value: "1", selected: false },
    ];

    setSortDateOptions(options);
    setSearchParams({
      sortDate,
      kind,
    });

    getRecipes({ page, sortDate, kind });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchedRecipes.isFetching]);

  useEffect(() => {
    if (fetchedRecipes.data) {
      if (page === 1) {
        setRecipes([...fetchedRecipes.data]);
      } else {
        setRecipes([...recipes, ...fetchedRecipes.data]);
      }
    }
  }, [fetchedRecipes.data]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      fetchedRecipes.isFetching
    ) {
      return;
    }
    setPage(page + 1);
    getRecipes({ page: page + 1, sortDate, kind });
  };

  const handleClickKindRecipe = (id: string) => {
    setPage(1);
    setSearchParams({ sortDate, kind: id });
    getRecipes({ page: 1, sortDate, kind: id });
  };

  const handleSelectSortDateOption = (val: string) => {
    setPage(1);
    setSearchParams({ sortDate: val, kind });

    const updatedOptions = sortDateOptions.map((o) => {
      if (o.value === val) return { ...o, selected: true };
      else return { ...o, selected: false };
    });
    setSortDateOptions(updatedOptions);

    getRecipes({ page: 1, sortDate: val, kind });
  };

  return (
    <>
      <KindsRecipe>
        <KindsRecipeButton
          isActive={kind === ""}
          onClick={() => handleClickKindRecipe("")}
        />
        {fetchedKinds.data?.map((k) => (
          <KindsRecipeButton
            kind={k}
            isActive={kind === k._id}
            onClick={() => handleClickKindRecipe(k._id)}
            key={k._id}
          />
        ))}
      </KindsRecipe>
      <Container>
        {fetchedRecipes.isLoading ? (
          <div>Loading...</div>
        ) : (
          <RecipesList recipes={recipes || []} title="Recipes List">
            <Select
              options={sortDateOptions}
              onSelect={handleSelectSortDateOption}
            />
          </RecipesList>
        )}
      </Container>
    </>
  );
};

export default MainRecipes;
