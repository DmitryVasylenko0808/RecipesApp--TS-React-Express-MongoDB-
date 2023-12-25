import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_AUTH } from "../../constants/api";
import { SignInInDTO } from "./dto/sign-in.in";
import { SignUpInDTO } from "./dto/sign-up.in";

type SignInParams = {
    login: string,
    password: string
}

type SignUpParams = {
    login: string,
    password: string,
    avatar_file: File
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL_AUTH
    }),
    endpoints: builder => ({
        signIn: builder.mutation<SignInInDTO, SignInParams>({
            query: body => ({
                url: "/signin",
                method: "POST",
                body
            })
        }),
        signUp: builder.mutation<SignUpInDTO, SignUpParams>({
            query: body => {
                const formData = new FormData();
                formData.append("login", body.login);
                formData.append("password", body.password);
                formData.append("avatar_file", body.avatar_file);

                console.log(body);

                return {
                    url: "/signup",
                    method: "POST",
                    body: formData,
                    formData: true
                }
            }
        })
    })
});

export const { useSignInMutation, useSignUpMutation } = authApi;