import React from "react";
import { Link } from "react-router-dom";
import { GetSearchedRecipesDTO } from "../../../api/recipes/dto/get-searched-recipes";

type SearchBarResultsProps = {
  recipes: GetSearchedRecipesDTO;
};

const SearchBarResults: React.FC<SearchBarResultsProps> = ({ recipes }) => {
  return (
    <div className="left-0 top-full absolute z-10 w-full flex flex-col bg-white text-lg shadow-xl">
      {recipes.map((r) => (
        <Link
          to={`/${r._id}`}
          className="px-4 py-2 hover:bg-gray-100"
          key={r._id}
        >
          {r.title}
        </Link>
      ))}
    </div>
  );
};

export default SearchBarResults;
