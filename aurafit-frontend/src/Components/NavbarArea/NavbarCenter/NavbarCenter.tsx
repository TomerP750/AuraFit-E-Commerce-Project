import "./NavbarCenter.css";
import {JSX} from "react";
import {NavLink} from "react-router-dom";

export function NavbarCenter(): JSX.Element {
    return (
        <div className="hidden sm:flex justify-between gap-5 text-sm text-gray-700">
			<NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/"}>Men</NavLink>
            <NavLink to={"/"}>Women</NavLink>
            <NavLink to={"/"}>Collections</NavLink>
        </div>
    );
}
