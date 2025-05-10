import "./BestSellingProducts.css";
import {JSX, useRef} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

export function BestSellingProducts(): JSX.Element {

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        scrollRef.current?.scrollBy({left: -320, behavior: "smooth"});
    };
    const scrollRight = () => {
        scrollRef.current?.scrollBy({left: 320, behavior: "smooth"});
    };


    return (
        <div className="flex flex-col items-center w-full gap-5">
            <div className="flex justify-between w-full">
                <h2 className="self-start text-2xl font-medium">Trending This Week</h2>
                <div className="flex gap-4">
                    <FiChevronLeft
                        className="size-8 cursor-pointer"
                        onClick={scrollLeft}
                    />
                    <FiChevronRight
                        onClick={scrollRight}
                        className="size-8 cursor-pointer"/>
                </div>
            </div>


            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square bg-cyan-500"
                    />
                ))}
            </div>
        </div>
    )
}
