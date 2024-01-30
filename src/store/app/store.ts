import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const INITIAL = {
    loading: true,
    start_date: null,
    end_date: null,
    my_status: "all",
}

const appSlice = createSlice({
    name: "app",
    initialState: INITIAL,
    reducers: {
        setLoading: (state: RootState, action: PayloadAction) => {
            state.loading = action.payload;
        },
        setStartDate: (state: RootState, action: PayloadAction) => {
            state.start_date = action.payload;
        },
        setEndDate: (state: RootState, action: PayloadAction) => {
            state.end_date = action.payload;
        },
        setStatus: (state: RootState, action: PayloadAction) => {
            state.my_status = action.payload;
        },
        resetAppState: (state: RootState, action: PayloadAction) => {
            state.start_date = INITIAL.start_date;
            state.end_date = INITIAL.end_date;
            state.my_status = INITIAL.my_status;
        }
    }
});

export const {setLoading, setStartDate, setEndDate, setStatus, resetAppState} = appSlice.actions;

export const appReducer = appSlice.reducer;
