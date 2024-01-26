import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        id: null
    },
    reducers: {
        setCartId: (state: RootState, action: PayloadAction) => {
            state.id = action.payload;
        }
    }
});

export const {setCartId} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
