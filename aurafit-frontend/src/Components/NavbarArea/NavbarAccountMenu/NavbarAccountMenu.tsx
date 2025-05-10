import "./NavbarAccountMenu.css";
import {JSX} from "react";
import {logout} from "../../../Redux/AuthSlice.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {Role} from "../../../Models/Enums/Role.ts";
import {store} from "../../../Redux/store.ts";
import {useUserSelector} from "../../../Redux/hooks.ts";


interface NavbarAccountMenuProps {
    onMouseOver: () => void;
    onMouseLeave: () => void;
}
export function NavbarAccountMenu({onMouseOver, onMouseLeave}: NavbarAccountMenuProps): JSX.Element {

    const user = useUserSelector((state) => state.authSlice.user);
    const accountMenuItems = "px-4 py-2 text-gray-700 rounded hover:font-bold cursor-pointer";
    const navigate = useNavigate();
    const handleLogout = () => {
        store.dispatch(logout());
        navigate("/login");
    }


    return (
        <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className="absolute right-[4rem] w-64 bg-gray-100 p-5 shadow-gray-800 rounded-lg z-10 ">
            {/* Header */}
            <div className="px-4 py-3">
                <p className="text-lg font-semibold text-gray-800">Hello, {user?.firstName}</p>
                <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                </p>
            </div>

            <hr className="border-t border-gray-300"/>

            {/* Menu Items */}
            <ul className="py-2">
                {user?.role === Role.ADMIN && <li className={`${accountMenuItems}`}><NavLink to={"/admin/panel"}>Admin Panel</NavLink></li>}
                <li className={`${accountMenuItems}`}>
                    My Profile
                </li>
                <li className={`${accountMenuItems}`}>
                    Orders
                </li>
                <li className={`${accountMenuItems}`}>
                    Settings
                </li>
                <li>
                    <button onClick={()=>handleLogout()} className={`${accountMenuItems}`}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}
