import "./NavbarTop.css";
import {JSX, useState} from "react";
import {NavLink} from "react-router-dom";
import {NavbarAccountMenu} from "../NavbarAccountMenu/NavbarAccountMenu.tsx";
import {useUser} from "../../../Redux/Store.ts";

export function NavbarTop(): JSX.Element {

    const [hovered, setHovered] = useState(false);

    const navbarTopItem = "cursor-pointer";

    const user = useUser();

    return (
        <div className="flex justify-center h-10 bg-gray-200">
            <div className="w-9/10 flex justify-end items-center h-full items-center">
                <div className="flex items-center">
                    {user ?
                        <ul className={"flex items-center gap-4 text-sm font-medium"}>
                            <li>2</li>
                            <p className={"font-light"}>|</p>
                            <li>
                                <p
                                    onMouseOver={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    className={`relative ${navbarTopItem}`}> Hello, {user?.firstName}
                                </p>
                                {hovered && <NavbarAccountMenu onMouseLeave={() => setHovered(false)} onMouseOver={() => setHovered(true)}/>}
                            </li>


                        </ul>
                        : <ul className={"flex items-center gap-4 text-sm font-medium"}>
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
