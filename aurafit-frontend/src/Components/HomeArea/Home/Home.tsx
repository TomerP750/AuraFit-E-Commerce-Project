import "./Home.css";
import {JSX} from "react";
import {Hero} from "../Hero/Hero.tsx";

export function Home(): JSX.Element {
    return (
        <div className="Home">
			<Hero/>
        </div>
    );
}
