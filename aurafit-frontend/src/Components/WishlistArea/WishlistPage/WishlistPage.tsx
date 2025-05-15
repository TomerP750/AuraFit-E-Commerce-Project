import "./WishlistPage.css";
import {JSX, useEffect, useState} from "react";
import {WishlistItem} from "../../../Models/WishlistItem.ts";
import wishlistService from "../../../Services/WishlistService.ts";
import {toast} from "react-toastify";
import {WishlistCard} from "../WishlistCard/WishlistCard.tsx";

export function WishlistPage(): JSX.Element {

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

    useEffect(() => {
        wishlistService.allWishlistItems()
            .then(res => {
                setWishlistItems(res)
                console.log(res)
            })
            .catch(err => toast.error(err));
    }, [])

    const handleAddToCart = (wishlistItemId: number) => {
        setWishlistItems(items =>
            items.filter(w => w.id !== wishlistItemId)
        );
    }

    if (!wishlistItems) {
        return (
            <span>Loading...</span>
        )
    }

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="flex w-4/5 justify-center mt-20">
                {/*    Left section*/}
                <div className="flex flex-col w-full items-center gap-10">
                    <p className={"text-4xl font-medium"}>Your Wishlist</p>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
                        {wishlistItems.map((w) => (
                            <WishlistCard onAddToCart={()=>handleAddToCart(w.id)} key={w.id} wishlistItem={w}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
