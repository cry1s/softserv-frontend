import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createHashRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from "./modules/HomePage/HomePage";
import SoftPage from "./modules/SoftPage/SoftPage";
import LoginPage from "./modules/LoginPage/LoginPage";
import RegisterPage from "./modules/RegisterPage/RegisterPage";
import LogoutPage from "./modules/LogoutPage/LogoutPage";
import {Provider} from "react-redux";
import {store} from "./store/store";
import CartPage from "./modules/CartPage/CartPage";
import Root from "./modules/Root/Root";
import NewPage from "./modules/NewPage/NewPage";
import RequestsPage from "./modules/RequestsPage/RequestsPage";
import EditPage from "./modules/EditPage/EditPage";


const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root/>}>
                <Route index element={<HomePage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="logout" element={<LogoutPage/>}/>
                <Route path="request/:id" element={<CartPage/>}/>
                <Route path="edit/:id" element={<EditPage/>}/>
                <Route path="new" element={<NewPage/>}/>
                <Route path="requests" element={<RequestsPage/>}/>
                <Route path="soft/:id" element={<SoftPage/>}/>
            </Route>
        </>
    ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
