// import "./FullNavbar.css";
// import {JSX} from "react";
// import {NavbarTop} from "../NavbarTop/NavbarTop.tsx";
// import {Navbar} from "../Navbar/Navbar.tsx";
// import {NavbarBottom} from "../NavbarBottom/NavbarBottom.tsx";
// import {matchPath, useLocation} from "react-router-dom";
//
// export function FullNavbar(): JSX.Element {
//
//     const { pathname } = useLocation();
//
//     const noFixedRoutes = [
//         "/login",
//         "/register",
//         "/men", "/women", "/accessories",
//         "/admin/panel",
//         "/cart", "/wishlist","/checkout","/order/history",
//         "/order/success",
//         `${pathname.startsWith("/product")}`
//     ];
//
//     const isExcluded =
//         noFixedRoutes.some((p) => p === pathname) ||
//         Boolean(matchPath("/dashboard/:id", pathname));
//
//     const wrapperClasses = ["flex", "flex-col", "w-full", "z-100", !isExcluded && "fixed top-0 left-0",].filter(Boolean).join(" ");
//
//     return (
//         <nav className={wrapperClasses}>
// 			<NavbarTop/>
//             <Navbar/>
//             <NavbarBottom/>
//         </nav>
//     );
// }


// FullNavbar.tsx
import "./FullNavbar.css";
import { JSX } from "react";
import { NavbarTop } from "../NavbarTop/NavbarTop.tsx";
import { Navbar } from "../Navbar/Navbar.tsx";
import { NavbarBottom } from "../NavbarBottom/NavbarBottom.tsx";
import { matchPath, useLocation } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {useScrollUpTrigger} from "../../../Hooks/useScrollUpTrigger.ts";

export function FullNavbar(): JSX.Element {
    const { pathname } = useLocation();
    const visible = useScrollUpTrigger(50);

    const noFixedRoutes = [
        "/login",
        "/register",
        "/men", "/women", "/accessories",
        "/admin/panel",
        "/cart", "/wishlist", "/checkout", "/order/history",
        "/order/success",
        // filter out product pages
        ...(pathname.startsWith("/product") ? [pathname] : [])
    ];
    const isExcluded =
        noFixedRoutes.includes(pathname) ||
        Boolean(matchPath("/dashboard/:id", pathname));

    const wrapperClasses = [
        "flex", "flex-col", "w-full", "z-100",
        !isExcluded && "fixed top-0 left-0",
    ].filter(Boolean).join(" ");

    return (
        <AnimatePresence>
            <motion.nav
                className={wrapperClasses}
                initial={false}
                animate={{ y: visible ? 0 : -100 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <NavbarTop />
                <Navbar />
                <NavbarBottom />
            </motion.nav>
        </AnimatePresence>
    );
}

