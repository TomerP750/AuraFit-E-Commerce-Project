import "./FullNavbar.css";
import {JSX} from "react";
import {NavbarTop} from "../NavbarTop/NavbarTop.tsx";
import {Navbar} from "../Navbar/Navbar.tsx";
import {NavbarBottom} from "../NavbarBottom/NavbarBottom.tsx";
import {matchPath, useLocation} from "react-router-dom";

export function FullNavbar(): JSX.Element {

    const { pathname } = useLocation();

    const noFixedRoutes = [
        "/login",
        "/register",
        "/men", "/women", "/accessories",
        "/admin/panel",
        "/cart", "/wishlist"
    ];

    const isExcluded =
        noFixedRoutes.some((p) => p === pathname) ||
        Boolean(matchPath("/dashboard/:id", pathname));

    const wrapperClasses = ["flex", "flex-col", "w-full", "z-100", !isExcluded && "fixed top-0 left-0",].filter(Boolean).join(" ");

    return (
        <div className={wrapperClasses}>
			<NavbarTop/>
            <Navbar/>
            <NavbarBottom/>
        </div>
    );
}
