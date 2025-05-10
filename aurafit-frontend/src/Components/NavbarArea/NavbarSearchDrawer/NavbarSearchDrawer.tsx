import "./NavbarSearchDrawer.css";
import {JSX, useState} from "react";
import {FiSearch, FiX} from "react-icons/fi";
import {AnimatePresence, motion} from "framer-motion";


interface NavbarSearchDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export function NavbarSearchDrawer({open, setOpen}: NavbarSearchDrawerProps): JSX.Element {

    return (
        <>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Drawer with framer-motion animation */}
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'tween', duration: 0.4 }}
                            className="fixed inset-x-0 top-0 z-50 bg-white shadow-md h-50 cursor-default"
                        >
                            <div className="flex items-center h-full px-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close search"
                                    className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Semi-transparent overlay to close drawer when clicked */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black z-40 cursor-default"
                            onClick={() => setOpen(false)}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
