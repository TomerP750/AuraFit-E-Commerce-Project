import "./NavbarLeft.css";
import {JSX} from "react";
import {FaShop} from "react-icons/fa6";

export function NavbarLeft(): JSX.Element {
    return (
        <div className="flex items-center">
			<FaShop className={"size-10"}/>
        </div>
    );
}
