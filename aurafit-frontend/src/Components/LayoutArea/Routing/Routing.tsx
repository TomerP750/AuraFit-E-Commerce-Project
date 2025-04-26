import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import {JSX} from "react";
import {Home} from "../../HomeArea/Home/Home.tsx";
import {Men} from "../../ShopPagesArea/Men/Men.tsx";
import {ProductPage} from "../../ProductPage/ProductPage.tsx";

export function Routing(): JSX.Element {
    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/men"} element={<Men/>}/>
                <Route path={"/test"} element={<ProductPage/>}/>
            </Routes>

        </div>
    );
}
