import React, { useState } from "react";
import Button from "../../../components/Button";
import Paper from "../../../components/Paper";
import TextField from "../../../components/TextField";
import { useForm } from "react-hook-form";
import { AddIngredientsFormFields } from "../typed";

type AddGeneralRecipeInfoFormProps = {
  onSubmit: (data: AddIngredientsFormFields) => void;
};

const AddIngredientsForm: React.FC<AddGeneralRecipeInfoFormProps> = ({
  onSubmit,
}) => {
  const [countIngredients, setCountIngredients] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddIngredientsFormFields>();

  const onSubmitAddIngredients = (data: AddIngredientsFormFields) => {
    onSubmit(data);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setCountIngredients(countIngredients + 1);
  };

  const ingredients = Array.from(Array(countIngredients).keys());

  return (
    <Paper>
      <h3 className="mb-5 text-center text-xl font-bold">Ingredients</h3>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitAddIngredients)}
      >
        {ingredients.map((ing) => (
          <TextField
            label={`Ingredient #${ing}`}
            {...register(`ingredients.${ing}`, {
              required: "Field is required",
            })}
            error={errors.ingredients && errors.ingredients[ing]?.message}
          />
        ))}
        <div className="flex justify-center">
          <Button variant="outline" type="button" onClick={(e) => handleAdd(e)}>
            Add
          </Button>
        </div>
        <div className="flex justify-end">
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default AddIngredientsForm;
