import {createRoot} from 'react-dom/client'
import './index.css'
import {Layout} from "./Components/LayoutArea/Layout/Layout.tsx";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import {Provider} from "react-redux";
import {store} from "./Redux/store.ts";
import {ToastContainer} from "react-toastify";


axios.interceptors.request.use(function (config) {
    if (localStorage.token) { // if token exists
        config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
});


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToastContainer/>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </Provider>
)
