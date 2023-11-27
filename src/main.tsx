import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createHashRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultNavbar from "./components/DefaultNavbar/DefaultNavbar";
import HomePage from "./modules/HomePage/HomePage";
import SoftPage from "./modules/SoftPage/SoftPage";


const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage/>}/>
            <Route path="soft/:id" element={<SoftPage/>}/>
            <Route path="new" element={<h1>Это наша страница с чем-то новеньким</h1>}/>
        </>
    ),

)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DefaultNavbar></DefaultNavbar>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
