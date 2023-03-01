import { Anecdota } from "@/Interfaces/Anecdota";
import axios from "./Axios";

export const getAnecdotas = async () => {
    const res = await axios.get("/anecdotas")
    return res
}

export const putAcceptDev = async (id: object) => {
    const res = await axios.put("/dev/aceptar/anecdota", id)
    return res
}

export const putAnecdotaDev = async (id: string, anecdota: Anecdota) => {
    const res = await axios.put("/dev/edit/anecdota/"+id, anecdota)
    return res
}

export const getAnecdotasDev = async () => {
    const res = await axios.get("/dev/anecdotas")
    return res
}

export const deleteAnecdota = async (id: string) => {
    const res = await axios.delete("/delete/anecdota/"+id)
    return res
}

export const getAnecdota = async (id: string) => {
    const res = await axios.get("/anecdota/"+id)
    return res
}

export const getAnecdotasUser = async (id: string) => {
    const res = await axios.get("/anecdotas/user/"+id)
    return res
}

export const getAnecdotasList = async (id: object) =>{
    const res = await axios.post("/anecdotasList", id)
    return res
}

export const postSend = async (anecdota: Anecdota) => {
    const res = await axios.post("/anecdotas", anecdota)
    return res
}