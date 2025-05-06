import "./FullNavbar.css";
import {JSX} from "react";
import {NavbarTop} from "../NavbarTop/NavbarTop.tsx";
import {Navbar} from "../Navbar/Navbar.tsx";
import {NavbarBottom} from "../NavbarBottom/NavbarBottom.tsx";

export function FullNavbar(): JSX.Element {
    return (
        <div className="flex flex-col">
			<NavbarTop/>
            <Navbar/>
            <NavbarBottom/>
        </div>
    );
}
