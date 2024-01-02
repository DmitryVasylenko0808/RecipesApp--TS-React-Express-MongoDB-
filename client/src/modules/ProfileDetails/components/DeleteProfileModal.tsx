import React from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { useDeleteProfileMutation } from "../../../api/profiles/profilesApt";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../redux/hooks";
import { logOut } from "../../../redux/slices/authSlice";

type DeleteProfileModalProps = {
  onClose: () => void;
};

const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();

  const handleDelelteProfile = () => {
    deleteProfile()
      .unwrap()
      .then(() => {
        navigate("/");
        dispatch(logOut());
      })
      .catch((err) => alert(err.data.message));
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="mb-8 text-center text-xl font-bold">
        Do you really want to delete your account?
      </h3>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleDelelteProfile}
          disabled={isLoading}
        >
          {isLoading ? "Proccessing..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteProfileModal;
