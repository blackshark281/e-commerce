import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://shopsyindia.herokuapp.com/api/"
})