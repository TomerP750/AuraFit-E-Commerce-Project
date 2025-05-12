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
import {Role} from "../../../Models/Enums/Role.ts";
import {Women} from "../../ShopPagesArea/Women/Women.tsx";
import {Accessories} from "../../ShopPagesArea/Accessories/Accessories.tsx";
import {WishlistPage} from "../../WishlistArea/WishlistPage/WishlistPage.tsx";
import {CheckoutPage} from "../../CartAndOrderArea/CheckoutPage/CheckoutPage.tsx";
import {OrderSuccessfulPage} from "../../CartAndOrderArea/OrderSuccessfulPage/OrderSuccessfulPage.tsx";
import {useUserSelector} from "../../../Redux/hooks.ts";
// import {useUser} from "../../../Redux/store.ts";


export function Routing(): JSX.Element {

    const user = useUserSelector((state) => state.authSlice.user);

    return (
        <>
            <div className="mb-20">
                <Routes>

                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/cart"} element={<CartPage/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/product/:id"} element={<ProductPage/>}/>
                    <Route path={"/men"} element={<Men/>}/>
                    <Route path={"/women"} element={<Women/>}/>
                    <Route path={"/accessories"} element={<Accessories/>}/>
                    <Route path={"/wishlist"} element={<WishlistPage/>}/>
                    <Route path={"/checkout"} element={<CheckoutPage/>}/>
                    <Route path={"/order/success"} element={<OrderSuccessfulPage/>}/>


                    { user?.role === Role.ADMIN &&
                        <Route path={"/admin/panel"} element={<AdminPanel/>}/>
                    }

                    <Route path={"*"} element={<PageNotFound/>}/>

                </Routes>
            </div>
        </>
    );
}
