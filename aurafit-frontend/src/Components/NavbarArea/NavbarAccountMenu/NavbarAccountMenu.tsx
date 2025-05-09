import "./NavbarAccountMenu.css";
import {JSX} from "react";
import {authStore} from "../../../Redux/AuthSlice.ts";
import {NavLink} from "react-router-dom";
import {Role} from "../../../Models/Enums/Role.ts";


interface NavbarAccountMenuProps {
    onMouseOver: () => void;
    onMouseLeave: () => void;
}
export function NavbarAccountMenu({onMouseOver, onMouseLeave}: NavbarAccountMenuProps): JSX.Element {

    const accountMenuItems = "px-4 py-2 text-gray-700 rounded hover:font-bold cursor-pointer";

    const handleLogout = () => {

    }


    return (
        <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className="absolute right-[4rem] w-64 bg-white shadow-gray-300 rounded-lg z-10 ">
            {/* Header */}
            <div className="px-4 py-3">
                <p className="text-lg font-semibold text-gray-800">Hello, {authStore.getState().user?.firstName}</p>
                <p className="text-sm text-gray-500 truncate">
                    {authStore.getState().user?.email}
                </p>
            </div>

            <hr className="border-t border-gray-300"/>

            {/* Menu Items */}
            <ul className="py-2">
                {authStore.getState().user?.role === Role.ADMIN && <li className={`${accountMenuItems}`}><NavLink to={"/admin/panel"}>Admin Panel</NavLink></li>}
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
