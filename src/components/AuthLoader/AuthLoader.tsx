import React, {useEffect} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLogin} from "../../store/auth";
import {setLoading} from "../../store/app";

function AuthLoader() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            axios.defaults.headers.common["Authorization"] = "Bearer "+token;
            let payload = JSON.parse(atob(token.split(".")[1]));
            console.log(payload)
            dispatch(setLogin({username: payload.uname, moderator: payload.moderator, uid: payload.uid}))
            setLoading(false);
        } else {
            dispatch(setLoading(false))
        }
    }, [])
    return (
        <></>
    );
}

export default AuthLoader;
