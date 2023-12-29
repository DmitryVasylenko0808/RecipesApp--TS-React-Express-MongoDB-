import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_REVIEWS } from "../../constants/api";
import { GetReviewsDTO } from "./dto/get-reviews";
import { AddReviewInDTO } from "./dto/add-review.in";

type GetReviewsParams = {
    recipeId?: string,
    page: number,
    sortDate: string
}

type AddReviewParams = {
    recipeId?: string,
    text: string
}

export const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL_REVIEWS,
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        getReviews: builder.query<GetReviewsDTO, GetReviewsParams>({
            query: ({ recipeId, page, sortDate }) => `/${recipeId}?page=${page}&sortDate=${sortDate}`,
            providesTags: ["Reviews"]
        }),
        addReview: builder.mutation<AddReviewInDTO, AddReviewParams>({
            query: body => ({
                url: "/",
                method: "POST",
                body
            }),
            invalidatesTags: ["Reviews"]
        })
    }),
    tagTypes: ["Reviews"] 
});

export const { useLazyGetReviewsQuery, useAddReviewMutation } = reviewsApi;