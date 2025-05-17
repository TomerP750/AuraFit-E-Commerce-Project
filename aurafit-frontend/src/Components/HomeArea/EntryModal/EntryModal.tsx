import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export function EntryModal() {
    const [show, setShow] = useState(false);

    // open 2 seconds after mount
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                // backdrop
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* modal panel */}
                    <motion.div
                        className="relative bg-white rounded-xl p-10 shadow-xl max-w-2xl w-11/12"
                        initial={{ scale: 0.8, y: -30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: -30 }}
                        transition={{ type: "spring", stiffness: 280, damping: 30 }}
                    >
                        {/* close button */}
                        <button
                            onClick={() => setShow(false)}
                            aria-label="Close modal"
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FiX size={24} />
                        </button>

                        {/* content */}
                        <h2 className="text-3xl font-bold text-center mb-4">
                            Join Our Membership!
                        </h2>
                        <p className="text-center text-lg mb-8">
                            Register now and start accumulating membership points to unlock
                            exclusive rewards, discounts, and early access to new collections!
                        </p>

                        {/* optional CTA */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    /* navigate to your register page */
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg"
                            >
                                Register Now
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
