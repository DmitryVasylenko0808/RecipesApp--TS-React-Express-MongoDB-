import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_RECIPES } from "../../constants/api";
import { GetSearchedRecipesDTO } from "./dto/get-searched-recipes";
import { GetKindsRecipesDTO } from "./dto/get-kinds-recipes";
import { GetRecipesDTO } from "./dto/get-recipes";
import { GetRecipeDetailsDTO } from "./dto/get-recipe-details";
import { GetUserRecipesDTO } from "./dto/get-user-recipes";
import { GetFavoriteRecipesDTO } from "./dto/get-favorite-recipes";

type GetRecipesParams = {
    page: number,
    sortDate: string,
    kind?: string
}

type GetUserRecipesParams = {
    userId?: string,
    page: number,
    sortDate: string,
    kind?: string
}

type GetFavoriteRecipesParams = {
    userId?: string,
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
            query: ({ page, sortDate, kind }) => `/?page=${page}&sortDate=${sortDate}&kind=${kind}`,
            providesTags: ["Recipes"]
        }),
        getRecipeDetails: builder.query<GetRecipeDetailsDTO, string | undefined>({
            query: id => `/one/${id}`,
            providesTags: ["Recipes"]
        }),
        getSearched: builder.query<GetSearchedRecipesDTO, string>({
            query: searchValue => `/search/${searchValue}`,
            providesTags: ["Recipes"]
        }),
        getUserRecipes: builder.query<GetUserRecipesDTO, GetUserRecipesParams>({
            query: ({ userId, page, sortDate }) => `/user/${userId}?page=${page}&sortDate=${sortDate}`,
            providesTags: ["Recipes"]
        }),
        getFavoriteRecipes: builder.query<GetFavoriteRecipesDTO, GetFavoriteRecipesParams>({
            query: ({ userId, page, sortDate }) => `/user/${userId}?page=${page}&sortDate=${sortDate}`,
            providesTags: ["Recipes"]
        })
    }),
    tagTypes: ["Recipes"]
});

export const { 
    useGetKindsQuery, 
    useLazyGetKindsQuery, 
    useGetRecipeDetailsQuery, 
    useLazyGetRecipesQuery, 
    useLazyGetSearchedQuery ,
    useLazyGetUserRecipesQuery,
    useLazyGetFavoriteRecipesQuery
} = recipesApi;