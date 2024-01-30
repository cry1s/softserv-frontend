import { RootState } from "../store";
import { useSelector } from "react-redux";

export const useLoader = () => {
    return useSelector((state: RootState) => state.app.loading);
};

export const useStartDate = () => {
    return useSelector((state: RootState) => state.app.start_date);
};

export const useEndDate = () => {
    return useSelector((state: RootState) => state.app.end_date);
};

export const useStatus = () => {
    return useSelector((state: RootState) => state.app.my_status);
};
