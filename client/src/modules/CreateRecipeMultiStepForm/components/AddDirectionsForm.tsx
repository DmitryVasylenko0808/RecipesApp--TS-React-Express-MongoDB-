import React, { useState } from "react";
import Button from "../../../components/Button";
import Paper from "../../../components/Paper";
import TextField from "../../../components/TextField";
import { useForm } from "react-hook-form";
import { AddDirectionsFormFields } from "../typed";
import TextArea from "../../../components/TextArea";

type AddDirectionsFormProps = {
  onSubmit: (data: AddDirectionsFormFields) => void;
};

const AddDirectionsForm: React.FC<AddDirectionsFormProps> = ({ onSubmit }) => {
  const [countDirections, setCountDirections] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDirectionsFormFields>();

  const onSubmitAddDirections = (data: AddDirectionsFormFields) => {
    onSubmit(data);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setCountDirections(countDirections + 1);
  };

  const directions = Array.from(Array(countDirections).keys());

  return (
    <Paper>
      <h3 className="mb-5 text-center text-xl font-bold">Directions</h3>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitAddDirections)}
      >
        {directions.map((step) => (
          <TextArea
            label={`Step #${step}`}
            {...register(`directions.${step}`, {
              required: "Field is required",
            })}
            rows={2}
            error={errors.directions && errors.directions[step]?.message}
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

export default AddDirectionsForm;
