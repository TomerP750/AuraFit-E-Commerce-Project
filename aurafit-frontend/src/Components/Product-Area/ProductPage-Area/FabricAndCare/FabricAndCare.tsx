import "./FabricAndCare.css";
import {JSX} from "react";

export function FabricAndCare(): JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <p>Fabric & Care</p>
            <ul className="flex flex-col text-sm gap-1 ">
                <li>Material: 100% Cotton</li>
                <li>Machine Wash only</li>
            </ul>
        </div>
    );
}
