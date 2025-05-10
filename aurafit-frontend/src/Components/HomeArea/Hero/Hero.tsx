import "./Hero.css";
import {JSX, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import heroimage1 from "../../../assets/heroImage1.png"
import heroimage2 from "../../../assets/heroAccessories.png"
import heroimage3 from "../../../assets/heroShopMen.png"
import heroImage4 from "../../../assets/heroShopWomen.png"
import {useNavigate} from "react-router-dom";

export const images: string[] = [heroimage1, heroimage2,heroimage3, heroImage4]

export function Hero(): JSX.Element {

    const [current, setCurrent] = useState<number>(0);
    const total = images.length;
    const prev = (e: React.MouseEvent) =>
    {
        e.stopPropagation();
        setCurrent(i => (i === 0 ? total - 1 : i - 1));
    }
    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrent(i => (i === total - 1 ? 0 : i + 1));
    }

    const arrowItem = "size-12 cursor-pointer h-full"

    const navigate = useNavigate();

    const heroNavigate = (index: number) => {
        switch (index) {
            case 1:
                navigate("/accessories")
                break;
            case 2:
                navigate("/men")
                break;
            case 3:
                navigate("/women")
                break;
        }
    }


    return (
        <div className="w-full border border-black">
            <div
                onClick={() => heroNavigate(current)}
                className={`relative w-full h-180 bg-black ${current !== 0 && 'cursor-pointer'}`}>
                <img

                    src={images[current]}
                    alt={`slide ${current + 1}`}
                    className={`w-full h-full object-cover select-none pointer-events-none cursor-pointer`}
                />
                <div className="absolute inset-0 flex justify-between items-center h-full text-white">
                    <FiChevronLeft onClick={prev} className={arrowItem}/>
                    <FiChevronRight onClick={next} className={arrowItem}/>
                </div>
            </div>

        </div>
    );
}
