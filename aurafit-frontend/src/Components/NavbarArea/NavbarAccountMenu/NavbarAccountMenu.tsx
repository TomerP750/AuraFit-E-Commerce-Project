import "./NavbarAccountMenu.css";
import {JSX} from "react";
import {authStore} from "../../../Redux/AuthSlice.ts";

export function NavbarAccountMenu(): JSX.Element {

    const accountMenuItems = "px-4 py-2 text-gray-700 rounded hover:font-bold cursor-pointer";

    const handleLogout = () => {

    }


    return (
        <div className="absolute right-0 w-64 bg-white border rounded-lg z-10 ">
            {/* Header */}
            <div className="px-4 py-3 border-b">
                <p className="text-lg font-semibold text-gray-800">Hello, {authStore.getState().user?.firstName}</p>
                <p className="text-sm text-gray-500 truncate">
                    {authStore.getState().user?.email}
                </p>
            </div>

            {/* Menu Items */}
            <ul className="py-2">
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
