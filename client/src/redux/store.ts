import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "../api/recipes/recipesApi";
import { reviewsApi } from "../api/reviews/reviewsApi";

export const store = configureStore({
    reducer: {
        [recipesApi.reducerPath]: recipesApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer
    },
    middleware: (getDefaultMiddeware) => getDefaultMiddeware()
        .concat(recipesApi.middleware, reviewsApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;