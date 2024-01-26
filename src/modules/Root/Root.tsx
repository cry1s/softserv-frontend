import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthLoader from "../../components/AuthLoader/AuthLoader";
import DefaultNavbar from "../../components/DefaultNavbar/DefaultNavbar";
import Loader from "../../components/Loader/Loader";
import {useLoader} from "../../store/app";

function Root() {
    const loader = useLoader();
    return (
        <React.Fragment>
            {loader && <Loader></Loader>}
            <AuthLoader></AuthLoader>
            <DefaultNavbar></DefaultNavbar>
            <Outlet></Outlet>
        </React.Fragment>
    );
}

export default Root;
