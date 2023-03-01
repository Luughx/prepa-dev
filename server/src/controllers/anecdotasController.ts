import Anecdota from "../models/Anecdota";
import User from "../models/User"
import jwt from "jsonwebtoken"
import { escape } from "lodash";
const limite = 5

interface Decoded {
    id: string,
    isOwner: boolean
}

export const getAnecdotasDev = async (req:any, res:any) => {

    const token = req.session.token

    if (!token) return res.send({error: "No has accedido"})

    const anecdotas = await Anecdota.find({verified: false}).sort({createdAt: -1})

    res.send(anecdotas)
}

export const putAnecdotaDev = async (req:any, res:any) => {
    const token = req.session.token

    if (!token) return res.send({error: "No has accedido"})

    const { id } = req.params
    const { title, description, info, author } = req.body

    if (id.length != 24) return res.send(false)

    if (!title || !description || !info || !author) return res.send(false)
    
    const anecdota = await Anecdota.findByIdAndUpdate(id, {title, description, info, author})

    res.send(anecdota)
} 

export const putAcceptDev = async (req:any, res:any) => {

    const token = req.session.token

    if (!token) return res.send({error: "No has accedido"})
    
    const { id } = req.body

    if (id.length != 24) return res.send(false)
    
    const anecdota = await Anecdota.findByIdAndUpdate(id, {verified: true})

    res.json(anecdota)

}

export const deleteAnecdota = async (req:any, res:any) => {
    const { id } = req.params

    const token = req.session.token

    if (!token || id.length !== 24) {
        res.json({error: "No has accedido"})
        return
    }

    await Anecdota.findByIdAndDelete(id)

    res.json(true)
}

export const getAnecdota = async (req:any, res:any) => {
    
    const { id } = req.params

    if (id.length < 24) return res.json(false)

    const anecdota = await Anecdota.findById(id) 

    res.json(anecdota)
}

export const getAnecdotas = async (req:any, res:any) => {

    const anecdotasPag = await Anecdota.paginate({verified: true}, {limit:limite, sort: { createdAt: 'desc' }})

    const { docs, nextPage, prevPage, totalPages, page } = anecdotasPag
    
    let listVal = {
        isFirst: false, 
        isEnd: false, 
        one: true, 
        two: false, 
        three: false, 
        four: false, 
        five: false
    }

    let listNum = {
        oneN: page - 2,
        twoN: page - 1,
        threeN: page,
        fourN: page + 1,
        fiveN: page + 2

    }

    if(page == totalPages) {
        listVal.isEnd = true
    } else  if(page == 1) {
        listVal.isFirst = true
    }

    if(nextPage) {
        listVal.two = true
    }
    if(3 <= totalPages) {
        listVal.three = true
    }
    if(4 <= totalPages) {
        listVal.four = true
    }
    if(5 <= totalPages) {
        listVal.five = true
    }

    const all = {
        docs, listVal, listNum
    }
    res.json(all)
}

export const postAnecdotasList = async (req:any, res:any) => {

    const { id } = req.body

    if (!id) return res.send({error: "Pagina requerida"})

    const anecdotasPag = await Anecdota.paginate({verified: true}, {limit:limite, sort: { createdAt: 'desc' }, page: id})
    
    const { docs, nextPage, prevPage, totalPages, page } = anecdotasPag
    
    let listVal = {
        isFirst: false, 
        isEnd: false, 
        one: false, 
        two: false, 
        three: false, 
        four: false, 
        five: false
    }

    let listNum = {
        oneN: page - 2,
        twoN: page - 1,
        threeN: page,
        fourN: page + 1,
        fiveN: page + 2

    }

    if(page == totalPages) {
        listVal.isEnd = true
    } else  if(page == 1) {
        listVal.isFirst = true
    }

    if(listNum.oneN >0 && listNum.oneN <= totalPages) {
        listVal.one = true
    }
    if(listNum.twoN >0 && listNum.twoN <= totalPages) {
        listVal.two = true
    }
    if(listNum.threeN >0) {
        listVal.three = true
    }
    if(listNum.fourN <= totalPages && listNum.fourN <= totalPages) {
        listVal.four = true
    }
    if(listNum.fiveN <= totalPages && listNum.fiveN <= totalPages) {
        listVal.five = true
    }

    const all = {
        docs, listVal, listNum, nextPage, prevPage
    }

    res.json(all)
}

export const getAnecdotasUser = async (req:any, res:any) => {

    const { id } = req.params

    if (!id || id.length < 24) return res.send(false)

    const user = await User.findById(id)

    if (!user) return res.send(false)

    const anecdotas = await Anecdota.find({userID:user._id})
    res.json(anecdotas)
}

export const postAnecdota = async (req:any, res:any) => {
    
    const { title, description, info, author } = req.body

    if (!title || !description || !info) return res.send({"error": "Información requerida"})

    const token = req.session.token

    const anecdotaNew = new Anecdota()
    
    anecdotaNew.title = title
    anecdotaNew.description = description
    anecdotaNew.verified = false
    anecdotaNew.info = info

    if (token) {
        const decoded = (<any>jwt.verify(req.session.token, `${process.env.SECRET}`))
        anecdotaNew.userID = decoded.id
    }

    anecdotaNew.author = author
    
    await anecdotaNew.save()

    res.json(anecdotaNew)
}