import React from "react";
import { GetRecipeDetailsDTO } from "../../../api/recipes/dto/get-recipe-details";
import { Link } from "react-router-dom";
import Rating from "../../../components/Rating";

type RecipeDetalsInfoProps = {
  recipe?: GetRecipeDetailsDTO;
};

const RecipeDetalsInfo: React.FC<RecipeDetalsInfoProps> = ({ recipe }) => {
  let date: string | string[] | undefined = recipe?.date
    .toString()
    .split(/:|T|-/);
  date = date ? `${date[1]}.${date[2]}.${date[0]}` : "";

  return (
    <div className="">
      <div className="mb-7 flex items-center gap-x-7">
        <h2 className="text-2xl font-bold">{recipe?.title}</h2>
        {recipe?.ratings && (
          <Rating rating={recipe?.ratings} rateNumber={true} />
        )}
      </div>
      <p className="mb-7 text-gray-500">{recipe?.description}</p>

      <div className="mb-4 flex items-center gap-x-4 text-sm text-gray-500">
        <span className="">
          Recipe by{" "}
          <Link to={"/"} className="text-[18px] font-bold">
            {recipe?.author.login}
          </Link>
        </span>
        <span>|</span>
        <span className="">Created in {date}</span>
      </div>
    </div>
  );
};

export default RecipeDetalsInfo;
