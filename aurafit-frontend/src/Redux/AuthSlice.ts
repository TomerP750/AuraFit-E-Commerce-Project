import { Role } from "../Models/Enums/Role";
import {jwtDecode} from "jwt-decode";
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface JwtUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}


interface AuthState {
    user: JwtUser | null;
}

const token = localStorage.getItem("token");

const initState: AuthState = {
    user: token ? jwtDecode<JwtUser>(token) : null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        login(state: AuthState, action: PayloadAction<string>) {
            const decodedToken: JwtUser = jwtDecode<JwtUser>(action.payload);
            state.user = decodedToken;
        },
        logout(state: AuthState) {
            state.user = null;
            localStorage.removeItem("token");
        }
    }
})

export const { login, logout } = authSlice.actions;
export const authStore = configureStore({
    reducer: authSlice.reducer
})