import "./Images.css";
import {JSX} from "react";

export function Images(): JSX.Element {
    return (
        <div className="w-2/3 flex items-start gap-2">
            {/* Thumbnail column */}
            <div className="grid grid-rows-4 gap-2 h-full">
                <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
                <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
                <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
                <div className="w-[100px] h-[100px] rounded-lg bg-black"/>
            </div>

            {/* Main placeholder */}
            <div className="w-full max-w-[700px] aspect-square rounded-lg bg-black"/>
        </div>
    );
}
