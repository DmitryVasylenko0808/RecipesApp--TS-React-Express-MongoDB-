import React, { useState } from "react";
import Container from "../../../components/Container";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useAddReviewMutation } from "../../../api/reviews/reviewsApi";
import SnackBar from "../../../components/SnackBar";

type AddReviewFormFields = {
  text: string;
};

const AddReviewForm = () => {
  const { recipeId } = useParams();
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();

  const [requestError, setRequestError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddReviewFormFields>();

  const [addReview, { isLoading }] = useAddReviewMutation();

  const onSubmit = (data: AddReviewFormFields) => {
    if (!isAuthenticate) {
      navigate("/auth/sign-in");
    } else {
      addReview({ text: data.text, recipeId })
        .unwrap()
        .then(() => reset())
        .catch((err) => setRequestError(err.data.message));
    }
  };

  return (
    <div className="mb-8 p-5">
      <Container>
        <h3 className="mb-5 text-xl font-bold">Leave a review</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            {...register("text", { required: "Text is required" })}
            rows={5}
            error={errors.text && errors.text.message}
          />
          <div className="flex justify-end">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Proccessing..." : "Add Review"}
            </Button>
          </div>
        </form>
      </Container>
      {requestError && <SnackBar>{requestError}</SnackBar>}
    </div>
  );
};

export default AddReviewForm;
