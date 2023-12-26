import React, { useEffect, useState } from "react";
import { useLazyGetUserRecipesQuery } from "../../../api/recipes/recipesApi";
import { GetUserRecipesDTO } from "../../../api/recipes/dto/get-user-recipes";
import { Option } from "../../../types";
import { useParams } from "react-router";
import RecipesList from "../../../components/RecipesList";
import Select from "../../../components/Select";

const UserRecipes = () => {
  const { userId } = useParams();

  const [page, setPage] = useState<number>(1);
  const [recipes, setRecipes] = useState<GetUserRecipesDTO>([]);
  const [sortDateOptions, setSortDateOptions] = useState<Option[]>([]);

  const [fetchUserRecipes, fetchedUserRecipesData] =
    useLazyGetUserRecipesQuery();

  useEffect(() => {
    const options = [
      { name: "Newest", value: "-1", selected: true },
      { name: "Oldest", value: "1", selected: false },
    ];

    setSortDateOptions(options);

    fetchUserRecipes({ userId, page, sortDate: options[0].value });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchedUserRecipesData.isFetching]);

  useEffect(() => {
    if (fetchedUserRecipesData.data) {
      if (page === 1) {
        setRecipes([...fetchedUserRecipesData.data]);
      } else {
        setRecipes([...recipes, ...fetchedUserRecipesData.data]);
      }
    }
  }, [fetchedUserRecipesData.data]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      fetchedUserRecipesData.isFetching
    ) {
      return;
    }
    setPage(page + 1);

    const currentOption =
      sortDateOptions.find((o) => o.selected === true) || sortDateOptions[0];
    fetchUserRecipes({ userId, page: page + 1, sortDate: currentOption.value });
  };

  const handleSelectSortDateOption = (val: string) => {
    setPage(1);

    const updatedOptions = sortDateOptions.map((o) => {
      if (o.value === val) return { ...o, selected: true };
      else return { ...o, selected: false };
    });
    setSortDateOptions(updatedOptions);

    fetchUserRecipes({ userId, page: 1, sortDate: val });
  };

  return (
    <>
      <div className="py-9 flex justify-end">
        <Select
          options={sortDateOptions}
          onSelect={handleSelectSortDateOption}
        />
      </div>
      <RecipesList recipes={recipes || []}></RecipesList>
      {fetchedUserRecipesData.isFetching && (
        <div className="py-7 text-center">Loading...</div>
      )}
    </>
  );
};

export default UserRecipes;
