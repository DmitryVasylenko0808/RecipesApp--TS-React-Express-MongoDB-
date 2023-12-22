import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "../api/recipes/recipesApi";

export const store = configureStore({
    reducer: {
        [recipesApi.reducerPath]: recipesApi.reducer
    },
    middleware: (getDefaultMiddeware) => getDefaultMiddeware().concat(recipesApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;