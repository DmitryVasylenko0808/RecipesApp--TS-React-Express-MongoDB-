import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FavoritesState = {
    data: string[];
};

const initialState: FavoritesState = {
    data: []
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.data = action.payload;
        },
        clearFavorites: (state) => {
            state.data = [];
        },
        addFavoriteRecipe: (state, action: PayloadAction<string>) => {
            state.data.push(action.payload);
        },
        unfavoriteRecipe: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(item => item !== action.payload);
        }
    }
});

export const { 
    setFavorites, 
    clearFavorites, 
    addFavoriteRecipe, 
    unfavoriteRecipe 
} = favoritesSlice.actions;
export default favoritesSlice.reducer;