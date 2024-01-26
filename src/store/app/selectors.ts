import { RootState } from "../store";
import { useSelector } from "react-redux";

export const useLoader = () => {
    return useSelector((state: RootState) => state.app.loading);
};
