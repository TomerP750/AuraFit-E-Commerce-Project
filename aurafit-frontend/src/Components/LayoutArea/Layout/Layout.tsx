import "./Layout.css";
import {JSX} from "react";
import {Routing} from "../Routing/Routing.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {FullNavbar} from "../../NavbarArea/FullNavbar/FullNavbar.tsx";

export function Layout(): JSX.Element {
    return (
        <div className="">
            <FullNavbar/>
            <Routing/>
            <Footer/>
        </div>
    );
}
