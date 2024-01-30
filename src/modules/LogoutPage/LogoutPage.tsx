import React, {useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLogin} from "../../store/auth";
import {setCartId} from "../../store/cart";
import { resetAppState } from '../../store/app';

function LogoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        axios.post("/api/auth/logout").then(() => {
            localStorage.removeItem("token");
            axios.defaults.headers.common["Authorization"] = null;
            dispatch(resetAppState())
            dispatch(setLogin(null))
            dispatch(setCartId(null))
            navigate("/")
        }).catch(err => {
            console.log(err);
        }).finally(() => {
        })
    }, [dispatch, navigate]);

    return <></>;
}

export default LogoutPage;
