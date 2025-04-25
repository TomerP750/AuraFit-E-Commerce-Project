import "./Navbar.css";
import {JSX} from "react";
import {NavbarLeft} from "../NavbarLeft/NavbarLeft.tsx";
import {NavbarCenter} from "../NavbarCenter/NavbarCenter.tsx";
import {NavbarRight} from "../NavbarRight/NavbarRight.tsx";

export function Navbar(): JSX.Element {
    return (
        <div className="flex justify-center items-center py-5 font-medium bg-neutral-100">
            <div className="flex w-4/5 items-center justify-between">
			<NavbarLeft/>
            <NavbarCenter/>
            <NavbarRight/>
            </div>
        </div>
    );
}
