import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import {JSX} from "react";
import {Home} from "../../HomeArea/Home/Home.tsx";
import {Men} from "../../ShopPagesArea/Men/Men.tsx";
import {ProductPage} from "../../ProductPage/ProductPage.tsx";
import {AdminPanel} from "../../AdminArea/AdminPanel/AdminPanel.tsx";
import {Cart} from "../../CartAndOrderArea/Cart/Cart.tsx";
import {Login} from "../../AuthArea/Login/Login.tsx";
import {Register} from "../../AuthArea/Register/Register.tsx";
import {PageNotFound} from "../../PageNotFound/PageNotFound.tsx";


export function Routing(): JSX.Element {
    return (
        <>
            <div className="mb-20">
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/men"} element={<Men/>}/>
                    <Route path={"/cart"} element={<Cart/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"*"} element={<PageNotFound/>}/>
                </Routes>
            </div>
            <div className={"w-4/5"}>
                <Routes>
                    <Route path={"/test"} element={<ProductPage/>}/>
                </Routes>
            </div>
            <div className="w-full flex justify-center">
                <Routes>
                    <Route path={"/admin/panel"} element={<AdminPanel/>}/>
                </Routes>
            </div>
        </>
    );
}
