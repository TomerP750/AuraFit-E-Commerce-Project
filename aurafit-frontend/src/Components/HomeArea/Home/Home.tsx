import "./Home.css";
import {JSX} from "react";
import {Hero} from "../Hero/Hero.tsx";
import {LatestProducts} from "../LatestProducts/LatestProducts.tsx";
import {BestSellingProducts} from "../BestSellingProducts/BestSellingProducts.tsx";

export function Home(): JSX.Element {
    return (
        <div className="w-full flex flex-col items-center gap-10">
			<Hero/>
            <LatestProducts/>
            <BestSellingProducts/>
        </div>
    );
}
