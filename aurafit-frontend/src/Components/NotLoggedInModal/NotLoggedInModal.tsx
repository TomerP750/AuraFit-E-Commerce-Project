import "./NotLoggedInModal.css";
import {JSX, useEffect} from "react";
import {AiFillHeart} from "react-icons/ai";
import {FaX} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";


interface NotLoggedInModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export function NotLoggedInModal({onClose, isOpen}: NotLoggedInModalProps): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            // lock scroll
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        // clean up on unmount
        return () => {
            document.body.style.overflow = "";
        }

    }, [isOpen])

    return (
        <div className="fixed inset-0 z-50 flex flex-col gap-4 items-center justify-center w-full" role={"dialog"}
             aria-label={"true"}>
            {/*backdrop*/}
            <div className="absolute inset-0 bg-black/50" onClick={onClose}/>

            <div className={"relative flex flex-col justify-between bg-white inset-0 w-1/2 h-128 rounded-xl"}>
                {/*Content*/}
                <div className="w-full flex justify-between p-6">
                    <div className="flex items-center gap-2 w-full justify-center font-bold text-2xl">
                        <AiFillHeart/>
                        <p>SAVE TO WISHLIST</p>
                    </div>
                    <button>
                        <FaX className={"text-gray-700 cursor-pointer"} onClick={onClose}/>
                    </button>
                </div>

                {/*Images*/}
                <div className="flex">
                    <div className={"bg-gray-600 w-1/2 h-52"}/>
                    <div className={"bg-gray-300 w-1/2 h-52"}/>
                </div>

                <div className={"px-10"}>
                    <p>Looks like you’re not signed in yet! To save this item to your wishlist and keep all your favorite finds in one place, please create an account or log in. It only takes a moment, and you’ll unlock easy access to your personal wishlist, plus get the latest updates on new arrivals and exclusive offers. Let’s get you started!</p>
                </div>

                {/*Buttons*/}
                <div className={"w-full flex flex-col items-center gap-2 p-6"}>
                    <div className="flex gap-3 text-white w-2/3 font-semibold">
                        <button
                            onClick={()=>navigate("/register")}
                            className={"bg-black px-10 py-3 rounded-full cursor-pointer w-1/2"}>Create Account
                        </button>
                        <button
                            onClick={()=>navigate("/login")}
                            className={"bg-gray-500 px-10 py-3 rounded-full cursor-pointer w-1/2"}>Login</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
