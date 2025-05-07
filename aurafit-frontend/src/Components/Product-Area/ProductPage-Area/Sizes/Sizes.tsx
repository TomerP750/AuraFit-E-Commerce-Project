import "./Sizes.css";
import {JSX} from "react";

export function Sizes(): JSX.Element {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <p>Size</p>
                <p>Sizing chart</p>
            </div>
            <div className="flex gap-3 items-center">
                <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>S</button>
                <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>M</button>
                <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>L</button>
                <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>XL</button>
                <button className={"border border-gray-300 px-5 py-1 cursor-pointer"}>XXL</button>
            </div>
        </div>
    );
}
