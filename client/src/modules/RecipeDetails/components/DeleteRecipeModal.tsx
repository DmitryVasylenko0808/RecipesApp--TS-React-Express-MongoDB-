import React from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { GetRecipeDetailsDTO } from "../../../api/recipes/dto/get-recipe-details";
import { useDeleteRecipeMutation } from "../../../api/recipes/recipesApi";
import { useNavigate } from "react-router";

type DeleteRecipeModalProps = {
  recipe?: GetRecipeDetailsDTO;
  onClose: () => void;
};

const DeleteRecipeModal: React.FC<DeleteRecipeModalProps> = ({
  recipe,
  onClose,
}) => {
  const navigate = useNavigate();

  const [deleteRecipe, { isLoading }] = useDeleteRecipeMutation();

  const handleDeleteRecipe = () => {
    deleteRecipe(recipe?._id!)
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => alert(err.data.message));
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="mb-8 font-bold text-xl text-center">
        Do you really want to delete the recipe
        <br />"{recipe?.title}"
      </h2>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={handleDeleteRecipe}
        >
          {isLoading ? "Proccessing..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteRecipeModal;
