import "./NavbarBottom.css";
import {JSX} from "react";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";

export function NavbarBottom(): JSX.Element {

    const navbarTitles: string[] = [
        "Free Shipping over $75"
    ]

    const arrowItem = "size-7 cursor-pointer text-gray-500 hover:text-black"

    return (
        <div className="flex justify-center h-15 bg-gray-100">
            <div className="w-9/10 flex justify-center items-center h-full items-center">
                <div className="flex items-center w-1/2 justify-between">
                    <BiChevronLeft className={`${arrowItem}`}/>
                    <p className={"text-sm font-medium"}>{navbarTitles}</p>
                    <BiChevronRight className={`${arrowItem}`}/>
                </div>
            </div>
        </div>
    );
}
