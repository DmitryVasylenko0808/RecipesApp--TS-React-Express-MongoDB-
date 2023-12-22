import React, { useEffect, useState } from "react";
import { useLazyGetSearchedQuery } from "../../../api/recipes/recipesApi";
import SearchBarResults from "./SearchBarResults";

import SearchIcon from "../../../assets/icons/search.svg";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  const [getSearchedRecipes, { data, isFetching }] = useLazyGetSearchedQuery();

  useEffect(() => {
    const timer = setTimeout(() => getSearchedRecipes(search), 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <label className="relative min-w-[500px] flex items-center px-4 py-2 bg-white rounded-lg">
      <SearchIcon width={30} height={30} color="gray" />
      <input
        className="flex-auto ml-2 text-xl outline-0"
        placeholder="Search recipe..."
        onChange={handleChange}
      />
      {data && search && <SearchBarResults recipes={data} />}
    </label>
  );
};

export default SearchBar;
