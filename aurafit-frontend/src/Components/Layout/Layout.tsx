import "./Layout.css";
import {JSX} from "react";
import {Navbar} from "../NavbarArea/Navbar/Navbar.tsx";

export function Layout(): JSX.Element {
    return (
        <div className="">
			<Navbar/>
        </div>
    );
}
