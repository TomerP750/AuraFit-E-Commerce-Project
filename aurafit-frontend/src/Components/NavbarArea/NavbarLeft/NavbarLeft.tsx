import "./NavbarLeft.css";
import {JSX} from "react";
import {NavLink} from "react-router-dom";
import logo from "../../../assets/logo.png"

export function NavbarLeft(): JSX.Element {


    return (
        <section className="flex items-center">
			<NavLink to={"/"}><img src={logo} alt={"logo"} className={" w-[70px] h-full"}/></NavLink>
        </section>
    );
}
