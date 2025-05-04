import "./BestSellingProducts.css";
import {JSX, useRef} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

export function BestSellingProducts(): JSX.Element {

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" });
    };
    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col items-center w-full gap-5">
            <div className="flex justify-between w-full">
                <h2 className="self-start text-2xl font-bold">Shop Latest Items</h2>
                <div className="flex gap-4">
                    <FiChevronLeft
                        className="size-8 cursor-pointer"
                        onClick={scrollLeft}
                    />
                    <FiChevronRight
                        onClick={scrollRight}
                        className="size-8 cursor-pointer" />
                </div>
            </div>


            {/* ← scroll container */}
            <div ref={scrollRef} className="w-full overflow-x-auto py-2">
                {/* ← inner flex that can grow past the wrapper’s width */}
                <div className="flex gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[300px] h-[300px] bg-yellow-200"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
