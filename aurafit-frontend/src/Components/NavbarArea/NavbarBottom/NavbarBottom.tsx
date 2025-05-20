// src/components/NavbarBottom.tsx
import { useState, useEffect } from "react";
import {AnimatePresence, motion, Variants} from "framer-motion";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export function NavbarBottom() {
    const navbarTitles = [
        "Free Shipping over $75",
        "Register now and save on next order with membership points"
    ];
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIdx(i => (i + 1) % navbarTitles.length);
        }, 8000);
        return () => clearInterval(id);
    }, [navbarTitles.length]);

    const [direction, setDirection] = useState(1);

    const arrowCls = "mx-2 text-xl cursor-pointer text-gray-500 hover:text-black";

    const handlePrev = () => {
        setDirection(-1);
        setIdx((i) => (i - 1 + navbarTitles.length) % navbarTitles.length);
    };
    const handleNext = () => {
        setDirection(1);
        setIdx((i) => (i + 1) % navbarTitles.length);
    };

    const variants: Variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -50 : 50,
            opacity: 0,
        }),
    };

    return (
        <div className="flex justify-center items-center h-12 bg-gray-200 overflow-hidden">
            <BiChevronLeft onClick={handleNext} className={arrowCls} />

            <div className="w-1/2 h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={idx}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4 }}
                        className="h-full flex items-center justify-center"
                    >
            <span className="text-sm font-medium text-center text-black">
              {navbarTitles[idx]}
            </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            <BiChevronRight onClick={handlePrev} className={arrowCls} />
        </div>
    );
}
