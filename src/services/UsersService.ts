import axios from "./Axios";
import { User } from "@/Interfaces/User";

export const logout = async () => {
    const res = await axios.get("/logout")
    return res
}

export const getDataUser = async (id: object) => {
    const res = await axios.post("/usuarios/getDataUser", id)
    return res
}

export const postSignin = async (user: object) => {
    const res = await axios.post("/usuarios/iniciar-sesion", user)
    return res
}

export const postSignup = async (user: User) => {
    const res = await axios.post("/usuarios/registrarse", user)
    return res
}

export const verifyEmail = async (email: string) => {
    const res = await axios.get("/usuarios/email-verificar/"+ email)
    return res
}