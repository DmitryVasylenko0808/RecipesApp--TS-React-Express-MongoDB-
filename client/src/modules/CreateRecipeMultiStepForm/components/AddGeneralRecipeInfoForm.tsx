import React, { useEffect, useState } from "react";
import Paper from "../../../components/Paper";
import TextField from "../../../components/TextField";
import TextArea from "../../../components/TextArea";
import Select from "../../../components/Select";
import FileSelect from "../../../components/FileSelect";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import { AddGeneralRecipeInfoFields } from "../typed";
import { useGetKindsQuery } from "../../../api/recipes/recipesApi";
import { Option } from "../../../types";

type AddGeneralRecipeInfoFormProps = {
  formValues: AddGeneralRecipeInfoFields;
  onSubmit: (data: AddGeneralRecipeInfoFields) => void;
};

const AddGeneralRecipeInfoForm: React.FC<AddGeneralRecipeInfoFormProps> = ({
  formValues,
  onSubmit,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddGeneralRecipeInfoFields>({ values: formValues });

  const { data } = useGetKindsQuery();

  useEffect(() => {
    if (data) {
      const options = data.map((o, index) => ({
        name: o.title,
        value: o._id,
        selected: index === 0,
      }));
      setOptions(options);
    }
  }, [data]);

  const handleSelectOption = (val: string) => {
    const updatedOptions = options.map((o) => {
      if (o.value === val) return { ...o, selected: true };
      else return { ...o, selected: false };
    });
    setOptions(updatedOptions);
  };

  const onSubmitAddGeneralRecipeInfo = (data: AddGeneralRecipeInfoFields) => {
    const submitData = {
      ...data,
      kind: options.find((o) => o.selected)?.value!,
    };
    onSubmit(submitData);
  };

  return (
    <Paper>
      <h3 className="mb-5 text-center text-xl font-bold">
        General Recipe Info
      </h3>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitAddGeneralRecipeInfo)}
      >
        <TextField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title && errors.title.message}
        />
        <TextArea
          label="Description"
          rows={5}
          {...register("description", { required: "Description is required" })}
          error={errors.description && errors.description.message}
        />
        <Select
          options={options}
          label="Kind"
          onSelect={handleSelectOption}
          {...register("kind")}
        />
        <FileSelect label="Image" variant="recipe" {...register("image")} />
        <TextField
          label="Prep Time (in minutes)"
          {...register("prep_time", {
            required: "Prep Time is required",
            valueAsNumber: true,
          })}
          type="number"
          error={errors.prep_time && errors.prep_time.message}
        />
        <TextField
          label="Cook Time (in minutes)"
          {...register("cook_time", {
            required: "Cook Time Time is required",
            valueAsNumber: true,
          })}
          type="number"
          error={errors.cook_time && errors.cook_time.message}
        />
        <TextField
          label="Servings"
          {...register("servings", {
            required: "Servings is required",
            valueAsNumber: true,
          })}
          type="number"
          error={errors.servings && errors.servings.message}
        />
        <div className="flex justify-end">
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default AddGeneralRecipeInfoForm;
