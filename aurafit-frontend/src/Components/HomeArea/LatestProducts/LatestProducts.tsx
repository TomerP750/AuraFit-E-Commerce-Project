import "./LatestProducts.css";
import {JSX, useEffect, useRef, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

export function LatestProducts(): JSX.Element {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMostLeft, setIsMostLeft]   = useState(true);
    const [isMostRight, setIsMostRight] = useState(false);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
    };
    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
    };

    const onScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollLeft, clientWidth, scrollWidth } = el;
        setIsMostLeft(scrollLeft <= 0);
        setIsMostRight(scrollLeft + clientWidth >= scrollWidth);
    };

    useEffect(() => {
        onScroll();
    }, []);

    return (
        <div className="flex flex-col items-center w-full gap-5">
            <div className="flex justify-between w-full">
                <h2 className="self-start text-2xl font-medium">Shop Latest Items</h2>
                <div className="flex gap-4">
                    <button
                        onClick={scrollLeft}
                        disabled={isMostLeft}
                        className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <FiChevronLeft className=" w-8 h-8" />
                    </button>
                    <button
                        onClick={scrollRight}
                        disabled={isMostRight}
                        className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <FiChevronRight className="w-8 h-8" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="w-full overflow-x-auto py-2 px-5"
            >
                <div className="flex gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[300px] h-[300px] bg-yellow-200 rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
