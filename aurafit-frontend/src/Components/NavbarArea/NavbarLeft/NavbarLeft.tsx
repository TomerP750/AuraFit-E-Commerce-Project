import "./NavbarLeft.css";
import {JSX} from "react";
import {NavLink} from "react-router-dom";

export function NavbarLeft(): JSX.Element {


    return (
        <div className="flex items-center">
			<NavLink to={"/"}><p className={"text-2xl"}>AuraFit.</p></NavLink>
        </div>
    );
}
