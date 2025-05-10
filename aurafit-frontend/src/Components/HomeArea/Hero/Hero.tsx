import "./Hero.css";
import {JSX, useEffect, useState} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import heroimage1 from "../../../assets/heroImage1.png";
import heroimage2 from "../../../assets/heroAccessories.png";
import heroimage3 from "../../../assets/heroShopMen.png";
import heroImage4 from "../../../assets/heroShopWomen.png";
import { useNavigate } from "react-router-dom";

export const images = [heroimage1, heroimage2, heroimage3, heroImage4];

const swipe = {
    enter: (dir: number) => ({
        x: dir > 0 ? "100%" : "-100%",
        zIndex: 0,
    }),
    center: { x: 0, zIndex: 1 }, // top of the stack
    exit: (dir: number) => ({
        x: dir > 0 ? "-100%" : "100%",
        zIndex: 0,
    }),
};

export function Hero(): JSX.Element {
    const [[idx, dir], setIdx] = useState<[number, number]>([0, 0]);
    const total = images.length;
    const navigate = useNavigate();



    const paginate = (d: number) =>
        setIdx(([i]) => [(i + d + total) % total, d]);

    useEffect(() => {
        const id = setInterval(() => paginate(1), 20000);
        return () => clearInterval(id);
    }, []);

    const goTo = (i: number) => setIdx([i, i > idx ? 1 : -1]);

    const heroNavigate = (i: number) => {
        switch (i) {
            case 1:
                navigate("/accessories");
                break;
            case 2:
                navigate("/men");
                break;
            case 3:
                navigate("/women");
                break;
        }
    };

    const arrow = "size-12 block cursor-pointer h-full hover:bg-white/10";

    return (
        <div className="w-full border border-black">
            <div
                onClick={() => heroNavigate(idx)}
                className={`relative w-full h-180 overflow-hidden ${
                    idx !== 0 && "cursor-pointer"
                }`}
            >
                {/* Slides */}
                <AnimatePresence initial={false} custom={dir}>
                    <motion.img
                        key={idx}
                        custom={dir}
                        variants={swipe}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", ease: "easeInOut", duration: 0.55 },
                        }}
                        src={images[idx]}
                        alt={`slide ${idx + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none"
                    />
                </AnimatePresence>

                {/*inside Hero component*/}

                {/*ARROWS*/}
                <div className="absolute inset-0 z-20 flex justify-between items-center h-full text-white">
                    <FiChevronLeft
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(-1);
                        }}
                        className={arrow}
                    />
                    <FiChevronRight
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(1);
                        }}
                        className={arrow}
                    />
                </div>

                {/*DTOS*/}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => {
                                e.stopPropagation();
                                goTo(i);
                            }}
                            className={`w-3 h-3 rounded-full transition ${
                                i === idx ? "bg-white scale-110" : "bg-gray-400 hover:bg-white cursor-pointer"
                            }`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}
