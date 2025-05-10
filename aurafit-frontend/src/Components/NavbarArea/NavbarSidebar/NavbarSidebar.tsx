import "./NavbarSidebar.css";
import {JSX, useState} from "react";
import {FaArrowLeft} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarSidebarProps {
    sidebarVisible: boolean
    onSidebarClose: () => void
}
export function NavbarSidebar({sidebarVisible, onSidebarClose}: NavbarSidebarProps): JSX.Element {

    return (
        <AnimatePresence>
            {sidebarVisible && (
                <motion.aside
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="fixed inset-y-0 right-0 w-full bg-white shadow-lg z-50 flex flex-col"
                >
                    <div className="flex items-center gap-3 p-4 border-b">
                        <button onClick={onSidebarClose} className="text-xl focus:outline-none cursor-pointer">
                            <FaArrowLeft />
                        </button>
                        <span className="font-medium">Menu</span>
                    </div>

                    <nav className="flex-1 flex flex-col text-gray-700">
                        <NavLink
                            onClick={onSidebarClose}
                            to="/"
                            className="py-3 px-6 hover:bg-gray-100"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            onClick={onSidebarClose}
                            to="/men"
                            className="py-3 px-6 hover:bg-gray-100"
                        >
                            Men
                        </NavLink>
                        <NavLink
                            onClick={onSidebarClose}
                            to="/women"
                            className="py-3 px-6 hover:bg-gray-100"
                        >
                            Women
                        </NavLink>
                        <NavLink
                            onClick={onSidebarClose}
                            to="/collections"
                            className="py-3 px-6 hover:bg-gray-100"
                        >
                            Collections
                        </NavLink>
                    </nav>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
