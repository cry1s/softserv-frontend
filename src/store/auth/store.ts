import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: null
    },
    reducers: {
        setLogin: (state: RootState, action: PayloadAction) => {
            state.login = action.payload;
        }
    }
});

export const {setLogin} = authSlice.actions;

export const authReducer = authSlice.reducer;
