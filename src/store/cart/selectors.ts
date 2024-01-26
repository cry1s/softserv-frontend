import { RootState } from "../store";
import { useSelector } from "react-redux";

export const useCart = () => {
    return useSelector((state: RootState) => state.cart.id);
};
