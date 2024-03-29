import React from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from "../../../api/profiles/profilesApt";
import { useForm } from "react-hook-form";
import Container from "../../../components/Container";
import Paper from "../../../components/Paper";
import TextField from "../../../components/TextField";
import FileSelect from "../../../components/FileSelect";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";

type EditProfileFormFields = {
  login: string;
  avatar_file: FileList | string | null;
};

const EditProfileForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProfileQuery(userId);
  const [editProfile, { isLoading: isLoadingEdit }] = useEditProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormFields>({
    values: {
      login: data?.login ?? "",
      avatar_file: data?.avatar_file || null,
    },
  });

  const onSubmit = (submitData: EditProfileFormFields) => {
    editProfile({
      ...submitData,
      avatar_file: submitData?.avatar_file
        ? (submitData?.avatar_file[0] as File)
        : null,
    })
      .unwrap()
      .then(() => navigate(`/profile/${userId}`))
      .catch((err) => alert(err.data.message));
  };

  if (isLoading)
    return (
      <Container>
        <Loading />
      </Container>
    );
  if (isError) return <Navigate to="*" />;

  return (
    <div>
      <Container>
        <div className="py-10 flex justify-center items-center">
          <Paper>
            <h2 className="mb-5 text-center text-2xl font-bold">
              Editing Profile
            </h2>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                label="Login"
                error={errors.login?.message}
                {...register("login", { required: "Login is required" })}
              />
              <FileSelect
                variant="avatar"
                defaultImage={data?.avatar_file}
                {...register("avatar_file")}
              />
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

export default EditProfileForm;
