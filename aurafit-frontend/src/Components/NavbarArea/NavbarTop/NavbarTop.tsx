import "./NavbarTop.css";
import {JSX, useState} from "react";
import {authStore} from "../../../Redux/AuthSlice.ts";
import {NavLink} from "react-router-dom";

export function NavbarTop(): JSX.Element {

    const [hovered, setHovered] = useState(false);


    return (
        <div className="flex justify-center h-10 bg-gray-200">
            <div className="w-9/10 flex justify-end items-center h-full items-center">
                <div className="flex items-center">
                    {authStore.getState().user ?
                        <ul className={"flex items-center gap-5 text-sm font-medium"}>
                            <li>2</li>
                            <li><p
                                onMouseOver={()=>setHovered(true)}
                                onMouseLeave={()=>setHovered(false)}
                                className={""}>Hello {authStore.getState().user?.firstName} </p></li>
                        </ul>
                        : <ul className={"flex items-center gap-5 text-sm font-medium"}>
                            <li><NavLink to={"/register"}>Join Us</NavLink></li>
                            <p className={"font-light"}>|</p>
                            <li><NavLink to={"/login"}>Login</NavLink></li>
                            {/*<li><p className={""}>Hello {authStore.getState().user?.firstName} </p></li>*/}
                        </ul>}
                </div>
            </div>
        </div>
    );
}
