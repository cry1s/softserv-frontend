import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./auth";
import {cartReducer} from "./cart";
import {appReducer} from "./app";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        app: appReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
