import "./NavbarCenter.css";
import { JSX } from "react";
import { NavLink } from "react-router-dom";
import { Gender } from "../../../Models/Enums/Gender";

const style = "relative cursor-pointer inline-flex items-center gap-2 text-black transition-all duration-200 \
after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:rounded-full after:transition-all after:duration-200 \
after:bg-black  hover:after:w-full hover:after:bg-black";

export function NavbarCenter(): JSX.Element {

    return (
        <div className="hidden sm:flex justify-between gap-5 text-md text-gray-700">
            <ul className="flex gap-8 items-center">
                {Object.values(Gender).map((cat) => (
                    <li key={cat}>
                        <NavLink
                            to={`/products/${cat}`}
                            className={style}
                        >
                            {cat[0].toUpperCase() + cat.slice(1).toLowerCase()}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
