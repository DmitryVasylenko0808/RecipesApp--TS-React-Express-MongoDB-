import React from "react";
import Button from "../../../components/Button";
import Paper from "../../../components/Paper";
import TextField from "../../../components/TextField";
import { AddNutritionFactsFields } from "../typed";
import { useForm } from "react-hook-form";

type AddDirectionsFormProps = {
  onSubmit: (data: AddNutritionFactsFields) => void;
};

const AddNutritionFactsForm: React.FC<AddDirectionsFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNutritionFactsFields>();

  const onSubmitAddNutritionFacts = (data: AddNutritionFactsFields) => {
    onSubmit(data);
  };

  return (
    <Paper>
      <h3 className="mb-5 text-center text-xl font-bold">Nutrition Facts</h3>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitAddNutritionFacts)}
      >
        <div className="flex gap-x-4">
          <TextField
            label="Calories"
            type="number"
            error={errors.calories?.message}
            {...register("calories", {
              required: "Field is required",
              valueAsNumber: true,
            })}
          />
          <TextField
            label="Carbs"
            type="number"
            error={errors.carbs?.message}
            {...register("carbs", {
              required: "Field is required",
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="flex gap-x-4">
          <TextField
            label="Fat"
            type="number"
            error={errors.fat?.message}
            {...register("fat", {
              required: "Field is required",
              valueAsNumber: true,
            })}
          />
          <TextField
            label="Protein"
            type="number"
            error={errors.protein?.message}
            {...register("protein", {
              required: "Field is required",
              valueAsNumber: true,
            })}
          />
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

export default AddNutritionFactsForm;
