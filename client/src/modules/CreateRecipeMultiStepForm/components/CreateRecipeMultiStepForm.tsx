import React, { useState } from "react";
import Container from "../../../components/Container";
import Stepper from "./Stepper";
import AddGeneralRecipeInfoForm from "./AddGeneralRecipeInfoForm";
import {
  AddDirectionsFormFields,
  AddGeneralRecipeInfoFields,
  AddIngredientsFormFields,
  AddNutritionFactsFields,
} from "../typed";
import AddIngredientsForm from "./AddIngredientsForm";
import AddDirectionsForm from "./AddDirectionsForm";
import AddNutritionFactsForm from "./AddNutritionFactsForm";
import { useAddRecipeMutation } from "../../../api/recipes/recipesApi";
import { useNavigate } from "react-router";
import SnackBar from "../../../components/SnackBar";

const initialgeneralRecipeInfoValues: AddGeneralRecipeInfoFields = {
  title: "",
  description: "",
  kind: "",
  image: undefined,
  prep_time: NaN,
  cook_time: NaN,
  servings: NaN,
};

const initialIngredients: AddIngredientsFormFields = {
  ingredients: [],
};

const initialDirections: AddDirectionsFormFields = {
  directions: [],
};

const initialNutritions: AddNutritionFactsFields = {
  calories: NaN,
  carbs: NaN,
  fat: NaN,
  protein: NaN,
};

const CreateRecipeMultiStepForm = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [requestError, setRequestError] = useState<string>("");
  const [generalRecipeInfoValues, setGeneralRecipeInfoValues] =
    useState<AddGeneralRecipeInfoFields>(initialgeneralRecipeInfoValues);
  const [ingredients, setIngredients] =
    useState<AddIngredientsFormFields>(initialIngredients);
  const [directions, setDirections] =
    useState<AddDirectionsFormFields>(initialDirections);
  const [nutritions, setNutritions] =
    useState<AddNutritionFactsFields>(initialNutritions);

  const [addRecipe] = useAddRecipeMutation();

  const submitAddGeneralRecipeInfo = (data: AddGeneralRecipeInfoFields) => {
    setGeneralRecipeInfoValues(data);
    setCurrentStep(2);
  };

  const submitAddIngredients = (data: AddIngredientsFormFields) => {
    setIngredients(data);
    setCurrentStep(3);
  };

  const submitAddDirections = (data: AddDirectionsFormFields) => {
    setDirections(data);
    setCurrentStep(4);
  };

  const submitAddNutritions = (data: AddNutritionFactsFields) => {
    setNutritions(data);
    const requestData = {
      ...generalRecipeInfoValues,
      ...nutritions,
      ...ingredients,
      ...directions,
      ...data,
      date: Date.now(),
    };

    addRecipe(requestData)
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => setRequestError(err.data.message));
  };

  return (
    <div>
      <Container>
        <Stepper countSteps={4} currentStep={currentStep} />
        <div className="p-5 flex justify-center">
          {currentStep === 1 && (
            <AddGeneralRecipeInfoForm
              formValues={generalRecipeInfoValues}
              onSubmit={submitAddGeneralRecipeInfo}
            />
          )}
          {currentStep === 2 && (
            <AddIngredientsForm onSubmit={submitAddIngredients} />
          )}
          {currentStep === 3 && (
            <AddDirectionsForm onSubmit={submitAddDirections} />
          )}
          {currentStep === 4 && (
            <AddNutritionFactsForm onSubmit={submitAddNutritions} />
          )}
        </div>
      </Container>
      {requestError && <SnackBar>{requestError}</SnackBar>}
    </div>
  );
};

export default CreateRecipeMultiStepForm;
