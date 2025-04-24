import "./Layout.css";
import {JSX} from "react";
import {Navbar} from "../../NavbarArea/Navbar/Navbar.tsx";
import {Routing} from "../Routing/Routing.tsx";
import {Footer} from "../Footer/Footer.tsx";

export function Layout(): JSX.Element {
    return (
        <div className="">
			<Navbar/>
            <Routing/>
            <Footer/>
        </div>
    );
}
