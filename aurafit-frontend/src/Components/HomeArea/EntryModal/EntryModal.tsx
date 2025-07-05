import {useState, useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {FiX} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import image from "../../../assets/entryModal.png"

export function EntryModal() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 20000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const original = document.body.style.overflow;
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = original;
        }
        return () => {
            document.body.style.overflow = original;
        };
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                // backdrop
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 text-white"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    {/* modal panel */}
                    <motion.div
                        className="relative bg-white p-10 shadow-xl w-3/4 h-2/3 bg-cover bg-center flex flex-col items-center justify-center"
                        style={{backgroundImage: `url(${image})`}}
                        initial={{scale: 0.8, y: -30}}
                        animate={{scale: 1, y: 0}}
                        exit={{scale: 0.8, y: -30}}
                        transition={{type: "spring", stiffness: 280, damping: 30}}
                    >

                        <div className={"absolute bg-black/40 w-full h-full"}/>
                        <div className="z-20 flex flex-col w-full items-center">
                            {/* close button */}
                            <button
                                onClick={() => setShow(false)}
                                aria-label="Close modal"
                                className="cursor-pointer text-white absolute top-4 right-4 text-gray-500 bg-gray-600"
                            >
                                <FiX size={24}/>
                            </button>

                            {/* content */}
                            <h2 className="text-3xl font-bold text-center mb-4">
                                Join Our Membership!
                            </h2>
                            <p className="text-center text-lg mb-8 w-3/4">
                                Register now and start accumulating membership points to unlock
                                exclusive rewards, discounts, and early access to new collections!
                            </p>

                            {/* CTA */}
                            <div className="flex justify-center">
                                <button
                                    onClick={() => {
                                        navigate("/register")
                                    }}
                                    className="cursor-pointer bg-black hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-lg"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

