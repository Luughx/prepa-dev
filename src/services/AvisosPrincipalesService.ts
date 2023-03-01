import axios from "./Axios";
// Avisos principales

export const getAvisosPrincipalesSecundarios = async () => {
    const res = await axios.get("/dev/aviso-principal/all/secundarios")
    return res
}
export const getAvisoPrincipalPrincipal = async () => {
    const res = await axios.get("/dev/aviso-principal/all/principales")
    return res
}

export const deleteAvisoPrincipal = async (id: string) => {
    const res = await axios.delete("/dev/aviso-principal/eliminar/"+id)
    return res
}

export const postAvisoPrincipal = async (aviso: FormData) => {
    const res = await axios.post("/dev/aviso-principal/agregar", aviso, {headers: {'Content-Type': 'multipart/form-data'}})
    return res
}

export const getAvisosPrincipales = async () => {
    const res = await axios.get("/dev/aviso-principal/all")
    return res
}

export const getAvisoPrincipal = async (id: string) => {
    const res = await axios.get("/dev/aviso-principal/view/"+id)
    return res
}

export const putAvisoPrincipal = async (id: string, aviso: FormData) => {
    const res = await axios.put("/dev/aviso-principal/editar/"+id, aviso, {headers: {'Content-Type': 'multipart/form-data'}})
    return res
}