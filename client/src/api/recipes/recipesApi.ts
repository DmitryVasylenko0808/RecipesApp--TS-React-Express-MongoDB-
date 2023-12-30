import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_RECIPES } from "../../constants/api";
import { GetSearchedRecipesDTO } from "./dto/get-searched-recipes";
import { GetKindsRecipesDTO } from "./dto/get-kinds-recipes";
import { GetRecipesDTO } from "./dto/get-recipes";
import { GetRecipeDetailsDTO } from "./dto/get-recipe-details";
import { GetUserRecipesDTO } from "./dto/get-user-recipes";
import { GetFavoriteRecipesDTO } from "./dto/get-favorite-recipes";
import { AddRecipeInDTO } from "./dto/add-recipe.in";

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

type AddRecipeParams = {
  title: string;
  description: string;
  kind: string,
  prep_time: number;
  cook_time: number;
  servings: number;
  ingredients: string[];
  directions: string[];
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  date: Date | string | number;
  image?: FileList
}

export const recipesApi = createApi({
    reducerPath: "recipesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL_RECIPES,
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
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
            query: ({ userId, page, sortDate }) => `/favorites/${userId}?page=${page}&sortDate=${sortDate}`,
            providesTags: ["Recipes"]
        }),
        addRecipe: builder.mutation<AddRecipeInDTO, AddRecipeParams>({
            query: body => {
                const formData = new FormData();
                formData.append("title", body.title);
                formData.append("description", body.description);
                formData.append("kind", body.kind);
                formData.append("prep_time", body.prep_time.toString());
                formData.append("cook_time", body.cook_time.toString());
                formData.append("servings", body.servings.toString());
                formData.append("date", body.date.toString());
                formData.append("ingredients", JSON.stringify(body.ingredients));
                formData.append("directions", JSON.stringify(body.directions));
                formData.append("calories", body.calories.toString());
                formData.append("carbs", body.carbs.toString());
                formData.append("fat", body.fat.toString());
                formData.append("protein", body.protein.toString());

                return {
                    url: "/",
                    method: "POST",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: ["Recipes"]
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
    useLazyGetFavoriteRecipesQuery,
    useAddRecipeMutation,
} = recipesApi;