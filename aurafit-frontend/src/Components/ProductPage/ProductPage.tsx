import "./ProductPage.css";
import {JSX, useState} from "react";
import {Size} from "../../Modals/Size.ts";
import {AiOutlineHeart} from "react-icons/ai";
import {FiArrowRight, FiChevronRight} from "react-icons/fi";
import {ProductPageSidebar} from "../ProductPageSidebar/ProductPageSidebar.tsx";
import {FaStar} from "react-icons/fa";

export function ProductPage(): JSX.Element {

    const [descriptionOpened, setDescriptionOpened] = useState(false);

    const sizes: Size[] = [Size.S, Size.M, Size.L, Size.XL, Size.XXXL]

    return (

        <div className="ProductPage flex flex-col-reverse lg:flex-row p-4 lg:p-8 h-screen">

            {/* Left: images scroll here */}
            <div className="w-full lg:w-1/2 h-full overflow-y-auto pr-4">
                {/* long list of images */}
                <div className="self-center w-[300px] h-[300px] sm:h-[600px] sm:w-full bg-yellow-200 mb-4"/>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="w-full sm:w-1/2 h-[200px] sm:h-[400px] bg-cyan-200"/>
                    <div className="w-full sm:w-1/2 h-[200px] sm:h-[400px] bg-cyan-200"/>
                </div>
                {/* …more images/content… */}
            </div>

            {/* Right: info scrolls here */}
            <div className="w-full lg:w-[25%] h-full overflow-y-auto pl-4 space-y-4">
                <p className="text-sm sm:text-base md:text-lg font-medium">
                    Sale 50% off
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    Product Name
                </p>
                {/*TODO make a 5 starts but change the starts to gold up to the average length*/}
                <div className="flex items-center gap-1">
                    <FaStar className={"text-black"}/>
                    <p>4</p>
                </div>
                <p className="text-base sm:text-lg">$70</p>

                {/* color variants */}
                <div className="flex flex-wrap gap-4">{/* … */}</div>

                {/* sizes */}
                <div className="flex w-1/2 sm:w-full">
                    {sizes.map((size, idx) => (
                        <button
                            key={idx}
                            className="py-2 px-4 bg-gray-100 text-sm sm:text-base w-full sm:w-auto"
                        >
                            {size}
                        </button>
                    ))}
                </div>

                {/* actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        className="bg-black flex-1 text-white py-3 px-8 w-full sm:w-auto active:bg-gray-700 transition duration-300">
                        Add To Cart
                    </button>
                    <button
                        className="bg-gray-200 rounded-3xl py-3 px-5 w-full sm:w-auto hover:bg-black hover:text-white active:bg-gray-700 transition duration-300 flex justify-center">
                        <AiOutlineHeart size={20}/>
                    </button>
                </div>

                {/* description trigger */}
                <button
                    onClick={() => setDescriptionOpened(true)}
                    type="button"
                    className="flex items-center justify-between w-full sm:w-1/2 bg-gray-100 rounded-lg py-2 px-4 hover:bg-gray-200 focus:outline-none transition"
                >
                    <span className="text-gray-700 font-medium flex-1">Description</span>
                    <FiChevronRight className="text-gray-700 text-xl"/>
                </button>

                {descriptionOpened && (
                    <ProductPageSidebar
                        onClose={() => setDescriptionOpened(false)}
                    />
                )}
            </div>
        </div>
    );
}
