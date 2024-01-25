import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Paper from "../../../components/Paper";
import { useNavigate, useParams } from "react-router";
import {
  useEditRecipeMutation,
  useGetKindsQuery,
  useGetRecipeDetailsQuery,
} from "../../../api/recipes/recipesApi";
import { useForm } from "react-hook-form";
import TextField from "../../../components/TextField";
import TextArea from "../../../components/TextArea";
import Select from "../../../components/Select";
import FileSelect from "../../../components/FileSelect";
import Button from "../../../components/Button";
import { Option } from "../../../types";
import Loading from "../../../components/Loading";

export type EditRecipeFormFields = {
  title: string;
  description: string;
  kind: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  image?: FileList;
  ingredients: string[];
  directions: string[];
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};

const EditRecipeForm = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetRecipeDetailsQuery(recipeId);
  const kinds = useGetKindsQuery();
  const [editRecipe, { isLoading: isLoadingEdit, isError: isErrorEdit }] =
    useEditRecipeMutation();

  const [fields, setFields] = useState<EditRecipeFormFields>(
    {} as EditRecipeFormFields
  );
  const [options, setOptions] = useState<Option[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditRecipeFormFields>({ values: fields });

  useEffect(() => {
    if (data) {
      setFields({
        title: data.title,
        description: data.description,
        kind: data.kind._id,
        prep_time: data.prep_time,
        cook_time: data.cook_time,
        servings: data.servings,
        ingredients: data.ingredients,
        directions: data.directions,
        ...data.nutritions,
      });
    }

    if (kinds.data) {
      const options = kinds.data.map((o) => ({
        name: o.title,
        value: o._id,
        selected: o._id === data?.kind._id,
      }));
      setOptions(options);
    }
  }, [data, kinds.data]);

  const handleSelectOption = (val: string) => {
    const updatedOptions = options.map((o) => {
      if (o.value === val) return { ...o, selected: true };
      else return { ...o, selected: false };
    });
    setOptions(updatedOptions);
  };

  const handleAddIngredient = (e: React.MouseEvent) => {
    e.preventDefault();

    setFields({
      ...fields,
      ingredients: [...fields.ingredients, ""],
    });
  };

  const handleAddStep = (e: React.MouseEvent) => {
    e.preventDefault();

    setFields({
      ...fields,
      directions: [...fields.directions, ""],
    });
  };

  const onSubmit = (submitData: EditRecipeFormFields) => {
    if (data) {
      editRecipe({
        id: data._id,
        ...submitData,
        kind: options.find((o) => o.selected === true)?.value!,
        image: submitData.image![0],
        date: data.date,
      })
        .unwrap()
        .then(() => navigate(`/${data._id}`))
        .catch((err) => alert(err.data.message));
    }
  };

  if (isLoading)
    return (
      <Container>
        <Loading />
      </Container>
    );
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Container>
        <div className="py-10 flex justify-center">
          <Paper>
            <h2 className="mb-5 text-center text-2xl font-bold">
              Editing recipe "{data?.title}"
            </h2>
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">General Info</h3>
                <TextField
                  label="Title"
                  error={errors.title?.message}
                  {...register("title", { required: "Title is required" })}
                />
                <TextArea
                  label="Description"
                  error={errors.description?.message}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={5}
                />
                <Select
                  label="Kind"
                  options={options}
                  onSelect={handleSelectOption}
                />
                <FileSelect
                  variant="recipe"
                  defaultImage={data?.image}
                  {...register("image")}
                />
                <TextField
                  label="Prep time"
                  type="number"
                  error={errors.prep_time?.message}
                  {...register("prep_time", {
                    required: "Prep Time is required",
                  })}
                />
                <TextField
                  label="Cook time"
                  type="number"
                  error={errors.cook_time?.message}
                  {...register("cook_time", {
                    required: "Cook Time is required",
                  })}
                />
                <TextField
                  label="Servings"
                  type="number"
                  error={errors.servings?.message}
                  {...register("servings", {
                    required: "Servings is required",
                  })}
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Ingredients</h3>
                {fields?.ingredients?.map((ing, i) => (
                  <TextField
                    label={`Ingredient ${i + 1}`}
                    error={errors.ingredients && errors.ingredients[i]?.message}
                    {...register(`ingredients.${i}`, {
                      required: "Field is required",
                    })}
                  />
                ))}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleAddIngredient}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Directions</h3>
                {fields?.directions?.map((dir, i) => (
                  <TextField
                    label={`Step ${i + 1}`}
                    error={errors.directions && errors.directions[i]?.message}
                    {...register(`directions.${i}`, {
                      required: "Field is required",
                    })}
                  />
                ))}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleAddStep}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Nutrition Facts</h3>
                <div className="flex gap-x-4">
                  <TextField
                    label="Calories"
                    type="number"
                    error={errors.calories?.message}
                    {...register("calories", { required: "Field is required" })}
                  />
                  <TextField
                    label="Carbs"
                    type="number"
                    error={errors.carbs?.message}
                    {...register("carbs", { required: "Field is required" })}
                  />
                </div>
                <div className="flex gap-x-4">
                  <TextField
                    label="Fat"
                    type="number"
                    error={errors.fat?.message}
                    {...register("fat", { required: "Field is required" })}
                  />
                  <TextField
                    label="Protein"
                    type="number"
                    error={errors.protein?.message}
                    {...register("protein", { required: "Field is required" })}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoadingEdit}
                >
                  {isLoadingEdit ? "Proccessing..." : "Edit"}
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default EditRecipeForm;
