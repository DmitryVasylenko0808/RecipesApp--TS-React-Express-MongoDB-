import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "../api/recipes/recipesApi";
import { reviewsApi } from "../api/reviews/reviewsApi";
import { authApi } from "../api/auth/authApi";
import authSlice from "./slices/authSlice";
import { profilesApi } from "../api/profiles/profilesApt";

export const store = configureStore({
    reducer: {
        [recipesApi.reducerPath]: recipesApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [profilesApi.reducerPath]: profilesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddeware) => getDefaultMiddeware()
        .concat(recipesApi.middleware, reviewsApi.middleware, profilesApi.middleware, authApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;