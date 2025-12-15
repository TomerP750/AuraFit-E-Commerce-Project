import { JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { Role } from "../../../Models/Enums/Role.ts";
import { useUserSelector } from "../../../Redux/hooks.ts";
import { AdminPanel } from "../../AdminArea/AdminPanel/AdminPanel.tsx";
import { Login } from "../../AuthArea/Login/Login.tsx";
import { Register } from "../../AuthArea/Register/Register.tsx";
import { CartPage } from "../../CartAndOrderArea/CartPage/CartPage.tsx";
import { CheckoutPage } from "../../CartAndOrderArea/CheckoutPage/CheckoutPage.tsx";
import { OrderHistoryPage } from "../../CartAndOrderArea/OrderHistoryPage/OrderHistoryPage.tsx";
import { OrderSuccessfulPage } from "../../CartAndOrderArea/OrderSuccessfulPage/OrderSuccessfulPage.tsx";
import { Home } from "../../HomeArea/Home/Home.tsx";
import { PageNotFound } from "../../PageNotFound/PageNotFound.tsx";
import { ProductPage } from "../../Product-Area/ProductPage-Area/ProductPage/ProductPage.tsx";
import { ShoppingList } from "../../ShopPagesArea/ShoppingList.tsx";
import { AccountPage } from "../../User-Area/AccountPage/AccountPage.tsx";
import { WishlistPage } from "../../WishlistArea/WishlistPage/WishlistPage.tsx";
import "./Routing.css";
// import {useUser} from "../../../Redux/store.ts";


export function Routing(): JSX.Element {

    const user = useUserSelector((state) => state.authSlice.user);

    return (
        <>
            <div className="pb-20">
                <Routes>

                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/cart"} element={<CartPage/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/product/:id/:variantId"} element={<ProductPage/>}/>
                    <Route path={"/products/:gender"} element={<ShoppingList />}/> 
                    <Route path={"/wishlist"} element={<WishlistPage/>}/>
                    <Route path={"/checkout"} element={<CheckoutPage/>}/>
                    <Route path={"/order/success"} element={<OrderSuccessfulPage/>}/>
                    <Route path={"/order/history"} element={<OrderHistoryPage/>}/>
                    <Route path={"/account"} element={<AccountPage/>}/>


                    { user?.role === Role.ADMIN &&
                        <Route path={"/admin/panel"} element={<AdminPanel/>}/>
                    }

                    <Route path={"*"} element={<PageNotFound/>}/>

                </Routes>
            </div>
        </>
    );
}
