import "./Home.css";
import {JSX} from "react";
import {Hero} from "../Hero/Hero.tsx";

export function Home(): JSX.Element {
    return (
        <div className="w-full flex flex-col h-screen items-center">
			<Hero/>
        </div>
    );
}
