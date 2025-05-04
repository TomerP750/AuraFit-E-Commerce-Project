import "./NavbarCenter.css";
import {JSX, useState} from "react";
import {NavLink} from "react-router-dom";

export function NavbarCenter(): JSX.Element {

    const [hovereD, setHovereD] = useState(false);

    return (
        <div className="hidden sm:flex justify-between gap-5 text-sm text-gray-700">
			<NavLink to={"/"} className={"flex flex-col items-center gap-1"}>
                <p>Home</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
            <NavLink to={"/men"} className={"flex flex-col items-center gap-1"}>
                <p>Men</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
            <NavLink to={"/test"} className={"flex flex-col items-center gap-1"}>
                <p>Women</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
            <NavLink to={"/admin/panel"} className={"flex flex-col items-center gap-1"}>
                <p>Collections</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
        </div>
    );
}
