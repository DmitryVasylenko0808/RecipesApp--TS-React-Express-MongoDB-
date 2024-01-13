import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { GetRecipeDetailsDTO } from "../../../api/recipes/dto/get-recipe-details";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../../../components/Rating";
import Button from "../../../components/Button";
import DeleteRecipeModal from "./DeleteRecipeModal";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { formatDate } from "../../../utils/formatDate";

type RecipeDetalsInfoProps = {
  recipe?: GetRecipeDetailsDTO;
};

const RecipeDetalsInfo: React.FC<RecipeDetalsInfoProps> = ({ recipe }) => {
  const { isAuthenticate, user } = useAuth();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const isUserRecipe = isAuthenticate && recipe?.author._id === user?._id;
  const date = formatDate(recipe?.date);

  const handleEdit = () => navigate(`/${recipe?._id}/edit`);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="mb-7 flex items-center gap-x-7">
          <h2 className="text-2xl font-bold">{recipe?.title}</h2>
          {recipe?.ratings && (
            <Rating rating={recipe?.ratings} rateNumber={true} />
          )}
        </div>
        {isUserRecipe && (
          <div className="flex gap-x-4">
            <Button variant="primary" onClick={handleEdit}>
              <EditIcon width={20} height={20} />
              Edit
            </Button>
            <Button variant="primary" onClick={handleOpenModal}>
              <DeleteIcon width={20} height={20} />
              Delete
            </Button>
          </div>
        )}
      </div>
      <p className="mb-7 text-gray-500">{recipe?.description}</p>

      <div className="mb-4 flex items-center gap-x-4 text-sm text-gray-500">
        <span className="">
          Recipe by{" "}
          <Link
            to={`/profile/${recipe?.author._id}`}
            className="text-[18px] font-bold"
          >
            {recipe?.author.login}
          </Link>
        </span>
        <span>|</span>
        <span className="">Created in {date}</span>
      </div>

      {isOpenModal && (
        <DeleteRecipeModal recipe={recipe} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default RecipeDetalsInfo;
