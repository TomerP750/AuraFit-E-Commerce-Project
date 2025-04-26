import {AnimatePresence, motion } from "framer-motion";
import "./ProductPageSidebar.css";
import {JSX, ReactNode} from "react";
import {FiChevronLeft, FiChevronRight, FiX} from "react-icons/fi";

export interface ProductPageSidebarProps {

    onClose: () => void;
    title?: string;
}
export function ProductPageSidebar({onClose, title}: ProductPageSidebarProps): JSX.Element {

    const panelVariants = {
        closed: { x: "100%" },
        open: { x: 0 },
    };
    

    return (
        <AnimatePresence>
            (
                <motion.aside
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={panelVariants}
                    transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl z-50"
                >
                    {/* Floating left-edge close arrow */}
                    <button
                        onClick={onClose}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full shadow-md focus:outline-none"
                        aria-label="Close drawer"
                    >
                        <FiChevronRight className="text-xl text-gray-600" />
                    </button>

                    {/* Header with X button */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded focus:outline-none"
                            aria-label="Close drawer"
                        >
                            <FiX className="text-2xl text-gray-600" />
                        </button>
                    </div>

                    {/* Content area */}
                    <div className="p-4 overflow-y-auto h-full">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupiditate dicta iusto neque rerum. Et ipsum non quae quis rem? Amet atque cum ex expedita in officiis provident quos rem.
                    </div>
                </motion.aside>
            )
        </AnimatePresence>
    );
}
