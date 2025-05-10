import "./Register.css";
import {JSX} from "react";
import logo from "../../../assets/logo.png";
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {RegisterRequest} from "../../../Models/RegisterRequest.ts";
import authService from "../../../Services/AuthService.ts";
import {toast} from "react-toastify";
import {store} from "../../../Redux/store.ts";
import {login} from "../../../Redux/AuthSlice.ts";

export function Register(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<RegisterRequest>();
    const navigate = useNavigate();
    const handleRegister = (registerRequest: RegisterRequest) => {
        console.log(registerRequest);
        authService.register(registerRequest)
            .then((res) =>{
                navigate("/")
                localStorage.token = res.token;
                store.dispatch(login(res.token))
                toast.success("Register successfully")
            } )
            .catch(err => toast.error(err.response.data));
    }


    return (
        <div className=" flex items-start justify-center px-4">
            <form className="w-full max-w-md p-8 space-y-6" onSubmit={handleSubmit(handleRegister)}>
                <img
                    src={logo}
                    alt="Logo"
                    className="mx-auto w-20 h-20 mb-2"
                />

                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Register
                </h2>

                <div className="space-y-1">
                    <label htmlFor="First Name" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        {...register("firstName")}
                        id="firstName"
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="Last Name" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        {...register("lastName")}
                        id="lastName"
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

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

                <button
                    type="submit"
                    className="w-full py-2 font-semibold rounded bg-black text-white hover:bg-gray-500 transition-colors"
                >
                    Register
                </button>

                <p className="text-center text-md text-gray-600">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-black font-medium hover:underline">
                        Log in
                    </NavLink>
                </p>
            </form>
        </div>
    );
}
