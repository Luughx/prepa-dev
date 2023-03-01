import axios from "./Axios";

export const getData = async () => {
    const res = await axios.get("/index/data")
    return res
}