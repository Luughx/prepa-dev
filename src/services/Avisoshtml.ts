import axios from "./Axios"

export const putAvisohtml = async (id: string, form: FormData) => {
    const res = await axios.put(`/dev/aviso-html/editar/${id}`, form, {headers: {'Content-Type': 'multipart/form-data'}})
    return res
}

export const getAvisoshtmlMain = async (id: string) => {
    const res = await axios.get(`/avisos-html/main/${id}`)
    return res
}

export const getAvisoshtmlDev = async () => {
    const res = await axios.get(`/dev/avisos-html/all`)
    return res
}

export const getAvisoshtmlList = async (id: string) => {
    const res = await axios.get(`/avisos-html/lista/${id}`)
    return res
}

export const getAvisoshtml = async () => {
    const res = await axios.get(`/avisos-html`)
    return res
}

export const getAvisohtml = async (id: string) => {
    const res = await axios.get(`/aviso-html/view/${id}`)
    return res
}

export const deleteAvisohtml = async (id: string) => {
    const res = await axios.delete(`/dev/aviso-html/eliminar/${id}`)
    return res
}

export const postAvisoHtml = async (aviso: object) => {
    const res = await axios.post("/dev/aviso-html/agregar", aviso, {headers: {'Content-Type': 'multipart/form-data'}})
    return res
}