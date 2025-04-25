import "./Login.css";
import {JSX} from "react";
import {useForm} from "react-hook-form";
import {RegisterRequest} from "../../../Modals/RegisterRequest.ts";

export function Login(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<RegisterRequest>();

    return (
        <div className="Login">

        </div>
    );
}
