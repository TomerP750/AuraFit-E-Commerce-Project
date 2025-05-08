import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import {JSX} from "react";
import {Home} from "../../HomeArea/Home/Home.tsx";
import {Men} from "../../ShopPagesArea/Men/Men.tsx";
import {ProductPage} from "../../Product-Area/ProductPage-Area/ProductPage/ProductPage.tsx";
import {AdminPanel} from "../../AdminArea/AdminPanel/AdminPanel.tsx";
import {CartPage} from "../../CartAndOrderArea/CartPage/CartPage.tsx";
import {Login} from "../../AuthArea/Login/Login.tsx";
import {Register} from "../../AuthArea/Register/Register.tsx";
import {PageNotFound} from "../../PageNotFound/PageNotFound.tsx";
import {authStore} from "../../../Redux/AuthSlice.ts";
import {Role} from "../../../Models/Enums/Role.ts";


export function Routing(): JSX.Element {
    return (
        <>
            <div className="mb-20">
                <Routes>

                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/cart"} element={<CartPage/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/test"} element={<ProductPage/>}/>
                    <Route path={"/men"} element={<Men/>}/>


                    { authStore.getState().user?.role === Role.ADMIN &&
                        <Route path={"/admin/panel"} element={<AdminPanel/>}/>
                    }

                    <Route path={"*"} element={<PageNotFound/>}/>

                </Routes>
            </div>
        </>
    );
}
