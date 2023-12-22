import React from "react";
import Container from "../../../components/Container";
import { GetKindsRecipesDTO } from "../../../api/recipes/dto/get-kinds-recipes";
import KindsRecipeButton from "./KindsRecipeButton";

type KindsRecipeProps = {
  children: React.ReactNode;
};

const KindsRecipe: React.FC<KindsRecipeProps> = ({ children }) => {
  return (
    <div className="relative py-4 shadow-xl">
      <Container>
        <div className="flex justify-between text-lg font-bold">{children}</div>
      </Container>
    </div>
  );
};

export default KindsRecipe;
