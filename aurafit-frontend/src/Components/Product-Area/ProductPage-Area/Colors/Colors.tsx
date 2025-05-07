import "./Colors.css";
import {JSX} from "react";

export function Colors(): JSX.Element {


    return (
        <div className="flex flex-col gap-1">
            <p>Color</p>
            <div className="flex items-center gap-3">
                <div className="cursor-pointer bg-black w-[40px] h-[40px] rounded-full"/>
                <div className="cursor-pointer bg-blue-900 w-[40px] h-[40px] rounded-full"/>
            </div>
        </div>
    );
}
