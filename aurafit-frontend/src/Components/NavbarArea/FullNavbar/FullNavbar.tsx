import "./FullNavbar.css";
import {JSX} from "react";
import {NavbarTop} from "../NavbarTop/NavbarTop.tsx";
import {Navbar} from "../Navbar/Navbar.tsx";

export function FullNavbar(): JSX.Element {
    return (
        <div className="flex flex-col">
			<NavbarTop/>
            <Navbar/>
        </div>
    );
}
