import "./Description.css";
import {JSX} from "react";

export function Description(): JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <p>Description</p>
            <p className={"text-gray-500"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus adipisci aperiam eum expedita, explicabo fugit id laudantium magnam molestiae
                nulla, quaerat quam quis, recusandae repellat sit sunt tempora temporibus vel.</p>
        </div>
    );
}
