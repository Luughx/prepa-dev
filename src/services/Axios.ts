import axios, { AxiosInstance } from "axios"

const axiosIntance: AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'? "https://server.daraan.site/api" : "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

export default axiosIntance