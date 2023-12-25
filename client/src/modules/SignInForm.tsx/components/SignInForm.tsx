import React, { useState } from "react";
import Paper from "../../../components/Paper";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../../../api/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserInfo } from "../../../redux/slices/authSlice";

type SignInFormFields = {
  login: string;
  password: string;
};

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [requestError, setRequestError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>();

  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = (data: SignInFormFields) => {
    signIn(data)
      .unwrap()
      .then((res) => {
        dispatch(setUserInfo(res));
        navigate("/");
      })
      .catch((err) => setRequestError(err.data.message));
  };

  const isDisabledButton = isSubmitting || isLoading;

  return (
    <div>
      <Paper>
        <h2 className="mb-5 text-center text-2xl font-bold">Sign In</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Login"
            error={errors.login?.message}
            {...register("login", { required: "Login is required" })}
          />
          <TextField
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />
          <span className="text-center text-sm text-red">{requestError}</span>
          <span className="py-2 inline-flex gap-x-2 text-gray-500">
            Don't have an account?
            <Link to="/auth/sign-up" className="text-red font-bold">
              Sign Up
            </Link>
          </span>
          <div className="flex justify-end">
            <Button variant="primary" type="submit" disabled={isDisabledButton}>
              {!isDisabledButton ? "Sign In" : "Processing..."}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default SignInForm;
