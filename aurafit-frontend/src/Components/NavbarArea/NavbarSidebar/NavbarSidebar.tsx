import "./NavbarSidebar.css";
import {JSX, useState} from "react";
import {FaArrowLeft} from "react-icons/fa";
import {NavLink} from "react-router-dom";


interface NavbarSidebarProps {
    sidebarVisible: boolean
    onSidebarClose: () => void
}
export function NavbarSidebar({sidebarVisible, onSidebarClose}: NavbarSidebarProps): JSX.Element {

    return (
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out ${sidebarVisible ? 'w-full' : `w-0`}`}>
			<div className={`flex flex-col text-gray-600`}>
                <div onClick={onSidebarClose} className="cursor-pointer flex items-center gap-4 p-3">
                    <FaArrowLeft/>
                    <p>Back</p>
                </div>
                <NavLink onClick={onSidebarClose} to={"/"} className={"py-2 pl-6 border"}>Home</NavLink>
                <NavLink onClick={onSidebarClose} to={"/"} className={"py-2 pl-6 border"}>Men</NavLink>
                <NavLink onClick={onSidebarClose} to={"/"} className={"py-2 pl-6 border"}>Women</NavLink>
                <NavLink onClick={onSidebarClose} to={"/"} className={"py-2 pl-6 border"}>Collections</NavLink>

            </div>
        </div>
    );
}
