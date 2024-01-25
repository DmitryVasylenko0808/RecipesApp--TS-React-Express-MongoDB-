import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useGetProfileQuery } from "../../../api/profiles/profilesApt";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import Button from "../../../components/Button";
import DeleteProfileModal from "./DeleteProfileModal";

import nullAvatar from "../../../assets/images/nullavatar.jpg";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { BASE_API_URL_AVATARS } from "../../../constants/api";

const ProfileDetails = () => {
  const { isAuthenticate, user } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data, isError } = useGetProfileQuery(userId);

  const handleEditProfile = () => navigate(`/profile/${userId}/edit`);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const imgSrc = data?.avatar_file
    ? `${BASE_API_URL_AVATARS}/${data.avatar_file}`
    : nullAvatar;

  const isUserProfile = isAuthenticate && userId === user?._id;

  if (isError) return <Navigate to="*" replace />;

  return (
    <>
      <div className="py-12 flex items-center">
        <img
          src={imgSrc}
          width="330"
          height="330"
          alt="Avatar"
          className="z-10 shadow-2xl rounded-full"
        />
        <div className="relative right-[19px] flex-auto px-8 py-10 border-4 shadow-2xl flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{data?.login}</h1>
        </div>
      </div>
      {isUserProfile && (
        <div className="flex justify-end gap-x-4">
          <Button variant="primary" onClick={handleEditProfile}>
            <EditIcon width={20} height={20} />
            Edit
          </Button>
          <Button variant="primary" onClick={handleOpenModal}>
            <DeleteIcon width={20} height={20} />
            Delete
          </Button>
        </div>
      )}
      {isOpenModal && <DeleteProfileModal onClose={handleCloseModal} />}
    </>
  );
};

export default ProfileDetails;
