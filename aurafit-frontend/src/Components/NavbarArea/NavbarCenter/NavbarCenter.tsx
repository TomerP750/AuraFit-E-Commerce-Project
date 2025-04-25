import "./NavbarCenter.css";
import {JSX} from "react";
import {NavLink} from "react-router-dom";

export function NavbarCenter(): JSX.Element {
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
            <NavLink to={"/women"} className={"flex flex-col items-center gap-1"}>
                <p>Women</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
            <NavLink to={"/collections"} className={"flex flex-col items-center gap-1"}>
                <p>Collections</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
        </div>
    );
}
