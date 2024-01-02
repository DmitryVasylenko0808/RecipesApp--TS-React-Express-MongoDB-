import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_PROFILES } from "../../constants/api";
import { GetProfileDTO } from "./dto/get-profile";
import { EditProfileDTO } from "./dto/edit-profile";

type EditProfileParams = {
    login: string,
    avatar_file: File | null;
}

export const profilesApi = createApi({
    reducerPath: "profilesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL_PROFILES,
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
        }
    }),
    endpoints: builder => ({
        getProfile: builder.query<GetProfileDTO, string | undefined>({
            query: id => `/${id}`,
            providesTags: ["Profiles"]
        }),
        editProfile: builder.mutation<EditProfileDTO, EditProfileParams>({
            query: body => {
                const formData = new FormData();
                formData.append("login", body.login);
                formData.append("avatar_file", body.avatar_file || "");

                return {
                    url: `/`,
                    method: "PATCH",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: ["Profiles"]
        })
    }),
    tagTypes: ["Profiles"]
});

export const { useGetProfileQuery, useEditProfileMutation } = profilesApi;