import "./Footer.css";
import {JSX} from "react";

export function Footer(): JSX.Element {
    return (

        <div className="text-center">
            <p className={"text-2xl font-medium text-gray-800"}>Subscribe now & get 15% off</p>
            <form className={"w-full sm:w-1/4 flex items-center gap-3 mx-auto my-6 border pl-3"}>
                <input className={"w-full sm:flex-1 outline-none"} type="email" placeholder={"Email"}
                       required={true}/>
                <button type={"submit"} className={"bg-black text-white text-xs px-10 py-4"}>Subscribe</button>
            </form>
        </div>


    );
}
