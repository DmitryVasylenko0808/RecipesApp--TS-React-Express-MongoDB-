import React, { useState } from "react";
import Paper from "../../../components/Paper";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../../api/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserInfo } from "../../../redux/slices/authSlice";
import FileSelect from "../../../components/FileSelect";
import SnackBar from "../../../components/SnackBar";

type SignUpFormFields = {
  login: string;
  password: string;
  password_confirm: string;
  avatar_file: FileList;
};

const SignUpForm = () => {
  const [requestError, setRequestError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>();

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = (data: SignUpFormFields) => {
    const { login, password, avatar_file } = data;
    console.log(avatar_file[0]);

    signUp({ login, password, avatar_file: avatar_file[0] })
      .unwrap()
      .then((res) => console.log(res.message))
      .catch((err) => setRequestError(err.data.message));
  };

  const isDisabledButton = isSubmitting || isLoading;

  return (
    <Paper>
      <h2 className="mb-5 text-center text-2xl font-bold">Registration</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Login"
          {...register("login", {
            required: "Login is required",
            minLength: {
              value: 3,
              message: "Login must have al least 3 characters",
            },
          })}
          error={errors.login?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have al least 8 characters",
            },
          })}
          error={errors.password?.message}
        />
        <TextField
          label="Repeat Password"
          type="password"
          {...register("password_confirm", {
            validate: (value: string, formValues: SignUpFormFields) => {
              return value === formValues.password || "Passwords don't match";
            },
          })}
          error={errors.password_confirm?.message}
        />
        <div className="flex justify-center">
          <FileSelect {...register("avatar_file")} />
        </div>
        <span className="py-2 inline-flex gap-x-2 text-gray-500">
          Already have an account?
          <Link to="/auth/sign-in" className="text-red font-bold">
            Sign In
          </Link>
        </span>
        <div className="flex justify-end">
          <Button variant="primary" type="submit" disabled={isDisabledButton}>
            {isDisabledButton ? "Processing..." : "Sign Up"}
          </Button>
        </div>
      </form>
      {requestError && <SnackBar>{requestError}</SnackBar>}
    </Paper>
  );
};

export default SignUpForm;
