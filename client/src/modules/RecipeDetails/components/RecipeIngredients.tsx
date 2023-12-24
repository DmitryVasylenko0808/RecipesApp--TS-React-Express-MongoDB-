import React from "react";

type RecipeIngredientsProps = {
  ingredients: string[];
};

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => {
  return (
    <div className="mb-7">
      <h3 className="mb-5 text-xl font-bold">Ingredients</h3>
      <ul className="pl-6 marker:text-sky-600 list-disc space-y-4 text-gray-500">
        {ingredients.map((ing, i) => (
          <li className="" key={i}>
            {ing}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;
