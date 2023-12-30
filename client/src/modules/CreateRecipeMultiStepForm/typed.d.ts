export type Step = {
    number: number;
    passed: boolean;
};

export type AddGeneralRecipeInfoFields = {
  title: string;
  description: string;
  kind: string,
  prep_time: number;
  cook_time: number;
  servings: number;
  image?: FileList
};

export type AddIngredientsFormFields = {
  ingredients: string[];
};

export type AddDirectionsFormFields = {
  directions: string[];
};

export type AddNutritionFactsFields = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};