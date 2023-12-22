import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_RECIPES } from "../../constants/api";
import { GetSearchedRecipesDTO } from "./dto/get-searched-recipes";
import { GetKindsRecipesDTO } from "./dto/get-kinds-recipes";
import { GetRecipesDTO } from "./dto/get-recipes";

type GetRecipesParams = {
    page: number,
    sortDate: string,
    kind?: string
}

export const recipesApi = createApi({
    reducerPath: "recipesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL_RECIPES
    }),
    endpoints: builder => ({
        getKinds: builder.query<GetKindsRecipesDTO, void>({
            query: () => "/kinds"
        }),
        getRecipes: builder.query<GetRecipesDTO, GetRecipesParams>({
            query: ({ page, sortDate, kind }) => `/?page=${page}&sortDate=${sortDate}&kind=${kind}`
        }),
        getSearched: builder.query<GetSearchedRecipesDTO, string>({
            query: searchValue => `/search/${searchValue}`,
            providesTags: ["Recipes"]
        })
    }),
    tagTypes: ["Recipes"]
});

export const { useGetKindsQuery, useGetRecipesQuery, useLazyGetSearchedQuery } = recipesApi;