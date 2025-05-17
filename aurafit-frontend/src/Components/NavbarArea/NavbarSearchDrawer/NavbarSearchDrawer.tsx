import "./NavbarSearchDrawer.css";
import {JSX, useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import logo from "../../../assets/logo.png"

interface NavbarSearchDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function NavbarSearchDrawer({open, setOpen}: NavbarSearchDrawerProps): JSX.Element {

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        // cleanup if component unmounts
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{y: '-100%'}}
                            animate={{y: 0}}
                            exit={{y: '-100%'}}
                            transition={{type: 'tween', duration: 0.4}}
                            className="fixed inset-x-0 top-0 z-50 bg-white shadow-md h-80 cursor-default"
                        >
                            <div className="flex items-start h-full px-4 w-full justify-between py-5 overflow-hidden">
                                <div className="flex justify-around items-center w-full h-1/3">
                                    <img src={logo} alt="logo" className={"h-2/3 aspect-square"}/>
                                    <input
                                        type="search"
                                        placeholder="Search..."
                                        className="w-2/3 border bg-gray-100 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                        required={true}
                                    />
                                    <button
                                        onClick={() => setOpen(false)}
                                        aria-label="Close search"
                                        className="ml-4 text-gray-700 focus:outline-none cursor-pointer hover:text-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Semi-transparent overlay to close drawer when clicked */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 0.5}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                            className="fixed inset-0 bg-black z-40 cursor-default"
                            onClick={() => setOpen(false)}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
