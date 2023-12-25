import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_AUTH } from "../../constants/api";
import { SignInInDTO } from "./dto/sign-in.in";

type SignInParams = {
    login: string,
    password: string
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
    })
});

export const { useSignInMutation } = authApi;