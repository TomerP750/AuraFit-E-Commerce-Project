import "./Login.css";
import {JSX, useState} from "react";
import {useForm} from "react-hook-form";
import {LoginRequest} from "../../../Models/LoginRequest.ts";
import authService from "../../../Services/AuthService.ts";
import {toast} from "react-toastify";
import logo from "../../../assets/logo.png"
import {NavLink, useNavigate} from "react-router-dom";
import {store} from "../../../Redux/store.ts";
import {login} from "../../../Redux/AuthSlice.ts";
import {saveCart} from "../../../Redux/CartSlice.ts";
import cartService from "../../../Services/CartService.ts";
import {Cart} from "../../../Models/Cart.ts";
import {useUserSelector} from "../../../Redux/hooks.ts";

export function Login(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<LoginRequest>();
    const navigate = useNavigate();
    const [cart, setCart] = useState<Cart | null>(store.getState().cartSlice.cart);

    const handleLogin = (loginRequest: LoginRequest) => {
        authService.login(loginRequest)
            .then((res) => {
                localStorage.token = res.token;
                store.dispatch(login(res.token));
                toast.success("Login successfully")

                const loader = res.token ? cartService.getUserCart() : cartService.getGuestCart()
                loader.then(res => {
                    setCart(res)
                    store.dispatch(saveCart(res))
                })
                    .catch(err => toast.error(err));
                navigate("/");
            })
            .catch(err => toast.error(err.response.data));


    }


    return (
        <div className="h-screen flex items-start justify-center px-4">
            <form className="w-full max-w-md p-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
                <img
                    src={logo}
                    alt="Logo"
                    className="mx-auto w-20 h-20 mb-2"
                />

                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Sign In to your account
                </h2>

                <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        {...register("password")}
                        id="password"
                        type="password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="text-right">
                    <NavLink
                        to=""
                        className="text-sm text-black font-medium hover:underline"
                    >
                        Forgot password?
                    </NavLink>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 font-semibold rounded bg-black text-white hover:bg-gray-500 transition-colors"
                >
                    Log In
                </button>

                <p className="text-center text-md text-gray-600">
                    Don’t have an account?{" "}
                    <NavLink to="/register" className="text-black font-medium hover:underline">
                        Sign up
                    </NavLink>
                </p>
            </form>
        </div>
    );
}
