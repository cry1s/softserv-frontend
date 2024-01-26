import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const appSlice = createSlice({
    name: "app",
    initialState: {
        loading: true
    },
    reducers: {
        setLoading: (state: RootState, action: PayloadAction) => {
            state.loading = action.payload;
        }
    }
});

export const {setLoading} = appSlice.actions;

export const appReducer = appSlice.reducer;
