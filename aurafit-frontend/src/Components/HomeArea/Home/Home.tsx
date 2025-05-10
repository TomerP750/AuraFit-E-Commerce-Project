import "./Home.css";
import {JSX} from "react";
import {Hero} from "../Hero/Hero.tsx";
import {LatestProducts} from "../LatestProducts/LatestProducts.tsx";
import {BestSellingProducts} from "../BestSellingProducts/BestSellingProducts.tsx";
import {IntroParagraph} from "../IntroParagraph/IntroParagraph.tsx";

export function Home(): JSX.Element {
    return (
        <div className="w-full flex flex-col items-center gap-20 pt-40">
            <Hero/>
            <IntroParagraph/>
            <div className="flex flex-col w-9/10 gap-20">
                <BestSellingProducts/>
                <LatestProducts/>
            </div>
        </div>
    );
}
