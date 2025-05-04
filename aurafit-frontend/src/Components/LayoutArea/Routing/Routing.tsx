import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import {JSX} from "react";
import {Home} from "../../HomeArea/Home/Home.tsx";
import {Men} from "../../ShopPagesArea/Men/Men.tsx";
import {ProductPage} from "../../ProductPage/ProductPage.tsx";
import {AdminPanel} from "../../AdminArea/AdminPanel/AdminPanel.tsx";



export function Routing(): JSX.Element {
    return (
        <>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/men"} element={<Men/>}/>

            </Routes>
        </div>
            <div className={"w-full"}>
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
