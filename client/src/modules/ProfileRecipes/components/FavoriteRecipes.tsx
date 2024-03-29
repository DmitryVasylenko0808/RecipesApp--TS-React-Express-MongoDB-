import React, { useEffect, useState } from "react";
import { useLazyGetFavoriteRecipesQuery } from "../../../api/recipes/recipesApi";
import { useParams } from "react-router";
import { GetUserRecipesDTO } from "../../../api/recipes/dto/get-user-recipes";
import { Option } from "../../../types";
import RecipesList from "../../../components/RecipesList";
import Select from "../../../components/Select";
import InfiniteScroll from "../../../components/InfiniteScroll";

const FavoriteRecipes = () => {
  const { userId } = useParams();

  const [page, setPage] = useState<number>(1);
  const [recipes, setRecipes] = useState<GetUserRecipesDTO>([]);
  const [sortDateOptions, setSortDateOptions] = useState<Option[]>([]);

  const [fetchFavoriteRecipes, fetchedFavoriteRecipesData] =
    useLazyGetFavoriteRecipesQuery();

  useEffect(() => {
    const options = [
      { name: "Newest", value: "-1", selected: true },
      { name: "Oldest", value: "1", selected: false },
    ];

    setSortDateOptions(options);

    fetchFavoriteRecipes({ userId, page, sortDate: options[0].value });
  }, []);

  useEffect(() => {
    if (fetchedFavoriteRecipesData.data) {
      if (page === 1) {
        setRecipes([...fetchedFavoriteRecipesData.data]);
      } else {
        setRecipes([...recipes, ...fetchedFavoriteRecipesData.data]);
      }
    }
  }, [fetchedFavoriteRecipesData.data]);

  const handleScroll = () => {
    setPage(page + 1);

    const currentOption = sortDateOptions.find((o) => o.selected === true);
    fetchFavoriteRecipes({
      userId,
      page: page + 1,
      sortDate: currentOption?.value || "-1",
    });
  };

  const handleSelectSortDateOption = (val: string) => {
    setPage(1);

    const updatedOptions = sortDateOptions.map((o) => {
      if (o.value === val) return { ...o, selected: true };
      else return { ...o, selected: false };
    });
    setSortDateOptions(updatedOptions);

    fetchFavoriteRecipes({ userId, page: 1, sortDate: val });
  };

  return (
    <>
      <div className="py-9 flex justify-end">
        <Select
          options={sortDateOptions}
          onSelect={handleSelectSortDateOption}
        />
      </div>
      <InfiniteScroll
        isFetching={fetchedFavoriteRecipesData.isFetching}
        onScroll={handleScroll}
      >
        <RecipesList recipes={recipes || []} />
      </InfiniteScroll>
    </>
  );
};

export default FavoriteRecipes;
