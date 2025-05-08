import "./Navbar.css";
import {JSX} from "react";
import {NavbarLeft} from "../NavbarLeft/NavbarLeft.tsx";
import {NavbarCenter} from "../NavbarCenter/NavbarCenter.tsx";
import {NavbarRight} from "../NavbarRight/NavbarRight.tsx";

export function Navbar(): JSX.Element {
    return (
        <div className="flex justify-center items-center font-medium bg-neutral-100">
            <div className="flex w-9/10 items-center justify-between">
                <NavbarLeft/>
                <NavbarCenter/>
                <NavbarRight/>
            </div>
        </div>
    );
}
