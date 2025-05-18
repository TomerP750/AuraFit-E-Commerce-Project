import "./NavbarRight.css";
import {JSX, useContext, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {FiHeart, FiMenu, FiSearch, FiShoppingBag} from "react-icons/fi";
import {NavbarSidebar} from "../NavbarSidebar/NavbarSidebar.tsx";
import {NavbarSearchDrawer} from "../NavbarSearchDrawer/NavbarSearchDrawer.tsx";
import {useUserSelector} from "../../../Redux/hooks.ts";
import {store} from "../../../Redux/store.ts";
export function NavbarRight(): JSX.Element {

    const [cartItemsCounter, setCartItemsCounter] = useState(store.getState().cartSlice.counter);
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
    const navbarItem = "size-5 hidden sm:block"
    const [search, setSearch] = useState(false);
    const user = useUserSelector(state => state.authSlice.user);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCartItemsCounter(store.getState().cartSlice.counter);
        })
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className=" flex justify-between gap-5 cursor-pointer">

            <FiSearch className={`${navbarItem}`} onClick={()=>setSearch(true)} />

            {search && <NavbarSearchDrawer open={search} setOpen={setSearch}/>}

            <FiHeart onClick={user ? ()=>navigate("/wishlist") : ()=>setModalOpen(true)} className={`${navbarItem}`}/>

            <NavLink to={"/cart"} className={"relative hidden sm:block"}>
                <FiShoppingBag className={"size-5"}/>
                {cartItemsCounter > 0 && <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{cartItemsCounter}</p>}
            </NavLink>

            <FiMenu className={"block sm:hidden size-7"} onClick={()=>setSidebarVisible(true)}/>

            {sidebarVisible && <NavbarSidebar sidebarVisible={sidebarVisible} onSidebarClose={()=>setSidebarVisible(false)}/>}

        </div>
    );
}
