import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_PROFILES } from "../../constants/api";
import { GetProfileDTO } from "./dto/get-profile";

export const profilesApi = createApi({
    reducerPath: "profilesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL_PROFILES
    }),
    endpoints: builder => ({
        getProfile: builder.query<GetProfileDTO, string | undefined>({
            query: id => `/${id}`
        })
    })
});

export const { useGetProfileQuery } = profilesApi;