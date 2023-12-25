import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
    _id: string,
    login: string,
    token: string
};

type AuthState = {
    user: User | null
}

const initialState: AuthState = {
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null;
        }
    }
})

export const { setUserInfo, logOut } = authSlice.actions;
export default authSlice.reducer;