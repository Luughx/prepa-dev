import axios from "./Axios";
import { StudentLogin } from "@/Interfaces/StudentLogin";

export const getStudent = async () => {
    const res = await axios.get("/dashboard/getstudent")
    return res
}

export const postLoginScores = async (student: StudentLogin) => {
    const res = await axios.post("/dashboard/scores", student)
    return res
}

export const getDownloadScores = async () => {
    // { responseType: "blob" }
    const res = await axios.get("/dashboard/scores/download", { responseType: "blob" })
    return res
}

export const deleteFileScores = async () => {
    const res = await axios.delete("/dashboard/scores/delete")
    return res
}

export const deleteLoginStudent = async () => {
    const res = await axios.delete("/dashboard/deletedata")
    return res
}

