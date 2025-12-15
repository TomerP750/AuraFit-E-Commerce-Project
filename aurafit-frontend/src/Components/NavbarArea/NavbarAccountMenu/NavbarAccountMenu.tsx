import "./NavbarAccountMenu.css";
import {JSX} from "react";
import {logout} from "../../../Redux/AuthSlice.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {Role} from "../../../Models/Enums/Role.ts";
import {useUserSelector} from "../../../Redux/hooks.ts";
import { AnimatePresence, motion } from 'framer-motion';
import {clean} from "../../../Redux/CartSlice.ts";
import {useDispatch} from "react-redux";



interface NavbarAccountMenuProps {
    onMouseOver: () => void;
    onMouseLeave: () => void;
}
export function NavbarAccountMenu({onMouseOver, onMouseLeave}: NavbarAccountMenuProps): JSX.Element {

    const dispatch = useDispatch();

    const user = useUserSelector((state) => state.authSlice.user);
    const accountMenuItems = "px-4 py-2 text-gray-700 rounded hover:font-bold cursor-pointer";
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        dispatch(clean())
        navigate("/login");
    }

    return (
        <AnimatePresence>
            <motion.div
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                className="absolute right-[4rem] w-64 bg-white p-3 shadow-gray-100 rounded-lg z-10"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: 'tween', duration: 0.15 }}
            >
                {/* Header */}
                <div className="px-4 py-3">
                    <p className="text-lg font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>

                <hr className="border-t border-gray-300"/>

                {/* Menu Items */}
                <ul className="py-2">
                    {user?.role === Role.ADMIN && (
                        <li className={accountMenuItems}>
                            <NavLink to={"/admin/panel"}>Admin Panel</NavLink>
                        </li>
                    )}
                    <li className={accountMenuItems}>
                        <NavLink to={`/account`}>My Account</NavLink>
                    </li>
                    <li className={accountMenuItems}>
                        <NavLink to={"/order/history"}>Order History</NavLink>
                    </li>
                    <li className={accountMenuItems}>Settings</li>
                    <li>
                        <button onClick={() => handleLogout()} className={accountMenuItems}>
                            Logout
                        </button>
                    </li>
                </ul>
            </motion.div>
        </AnimatePresence>
    )
}
