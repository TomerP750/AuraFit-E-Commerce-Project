import "./PageNotFound.css";
import {JSX} from "react";
import {NavLink} from "react-router-dom";

export function PageNotFound(): JSX.Element {
    return (
        <div className="flex flex-col h-screen justify-center items-center">

            <p className={"text-purple-900 text-lg"}>404</p>
            <p className={"text-7xl font-medium mb-5"}>Page not found</p>
            <p className={"opacity-90 mb-5"}>Sorry, we couldn't find the page you're looking for</p>
            <NavLink to={"/"} className={"bg-black py-2 px-3 rounded-lg text-white"}>Go Back Home</NavLink>

        </div>
    );
}
