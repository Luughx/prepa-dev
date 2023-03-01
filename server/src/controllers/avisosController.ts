import AvisoPrincipal from "../models/AvisoPrincipal"
import Avisohtml from "../models/Avisohtml"
import { read, unlink } from "fs-extra";
import { v2 as cloudinary}  from "cloudinary"
import { escape } from "lodash";
import { readFileSync } from "fs"
import sharp from "sharp"
import { join }  from "path"
import { v4 as uuidv4 } from "uuid";

function cloudConfig () {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})}

const compressionQuality = 80
const limit = 5

export const putAvisohtml = async (req:any, res:any) => {
    const token = req.session.token

    if (!token) return res.send({error: "No has accedido"})

    const { title, description, url, content} = req.body

    if (!title || !description || !url) return res.send({error: "Hay datos faltantes"})

    const { id } = req.params

    if (id.length < 24 ) return res.send({error: "Id inválida"})

    const titleEsc = escape(title)
    const descriptionEsc = escape(description)
    const urlEsc = escape(url)

    const aviso = await Avisohtml.findById(id)
    if (!aviso) return res.send({error: "Aviso no encontrado"})
    
    if (req.file) {
        cloudConfig()

        const urlCompressed = join(__dirname, `../../public/uploads/${uuidv4()}.webp`)
        await sharp(req.file.path).webp({quality: compressionQuality}).toFile(urlCompressed)
        await unlink(req.file.path)

        const image = await cloudinary.uploader.upload(urlCompressed)
        await unlink(urlCompressed)

        await cloudinary.uploader.destroy(aviso.publicID)

        await Avisohtml.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, url: urlEsc, content, imageURL: image.secure_url, publicID: image.public_id})
        
    } else {
        await Avisohtml.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, url: urlEsc, content})
    }

    res.send(true)
} 

export const deleteAvisohtml = async (req:any, res:any) => {

    const { id } = req.params
    
    const aviso = await Avisohtml.findByIdAndDelete(id) as any
    if (!aviso) return res.send({error: "Aviso no encontrado"})
    cloudConfig()
    await cloudinary.uploader.destroy(aviso.publicID)

    res.json(true)
}

export const getAvisohtml = async (req:any, res:any) => {

    const { id } = req.params

    const aviso = await Avisohtml.findOne({url: id})

    if (!aviso) {
        return res.send(false)
    }

    res.send(aviso)
}

export const getAvisoshtmlDev = async (req:any, res:any) => {

    const avisos = await Avisohtml.find().sort({createdAt: -1})

    res.send(avisos)
}

export const getAvisoshtml = async (req:any, res:any) => {

    const avisosPag = await Avisohtml.paginate({}, {limit, sort: { createdAt: 'desc' }})

    const { docs, nextPage, prevPage, totalPages, page } = avisosPag
    
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

export const getAvisoshtmlMain = async (req:any, res:any) => {

    const { id } = req.params

    if (id.length == 0) return res.send({error: "No especificó la cantidad de elementos"})

    const avisosPag = await Avisohtml.paginate({}, {limit: parseInt(id), sort: { createdAt: 'desc' }})
    const { docs } = avisosPag

    res.json(docs)
}

export const getAvisoshtmlList = async (req:any, res:any) => {

    const { id } = req.params

    
    if (id.length == 0) return res.send({error: "Pagina no especificada"})
    
    const avisosPag = await Avisohtml.paginate({}, {limit, sort: { createdAt: 'desc' }, page: parseInt(id)})

    const { docs, nextPage, prevPage, totalPages, page } = avisosPag
    
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

    //console.log(all)

    res.json(all)
}

export const postAvisohtml = async (req:any, res:any) => {

    cloudConfig()

    const { title, description, url, content } = req.body
    const { image, file } = req.files

    if (!title || !description || !url) return res.send({error: "Hay datos faltantes"})

    if (!image) return res.send({error: "Image required"})

    if (!file && !content)  return res.send({error: "Content required"})

    const typeSplitImage = image[0].mimetype.split("/")
    if (typeSplitImage[0] != "image") return res.send({error: "Wrong file type"})

    const urlMod = url.replace(/\s+/g, "-")
    
    const aviso = new Avisohtml()
    if (file) {
        const typeSplitFile = file[0].mimetype.split("/")
        
        if (typeSplitFile[0] != "text") return res.send({error: "Wrong file type"})
        const textContentRaw =  readFileSync(file[0].path, "utf-8")
        await unlink(file[0].path)
        const textContent = textContentRaw.replace(/(\r\n|\n|\r)/gm, "")
        aviso.content = textContent
    } else {
        aviso.content = content
    }
    const avisoUrlMatch = await Avisohtml.findOne({url})
    if (avisoUrlMatch) {
        await unlink(image[0].path)
        return res.send({error: "Esa url ya esta en uso"})
    } 
    
    const urlCompressed = join(__dirname, `../../public/uploads/${uuidv4()}.webp`)
    await sharp(image[0].path).webp({quality: compressionQuality}).toFile(urlCompressed)

    await unlink(image[0].path)
    const result = await cloudinary.uploader.upload(urlCompressed)
    await unlink(urlCompressed)

    aviso.title = escape(title)
    aviso.url = encodeURIComponent(urlMod)
    aviso.imageURL = result.secure_url
    aviso.publicID = result.public_id
    aviso.description = escape(description)

    aviso.save()

    res.json(aviso)
}

export const getAvisosPrincipalesSecundarios = async (req:any, res:any) => {

    const aviso = await AvisoPrincipal.find({type:"secundario"})
    
    res.json(aviso)
}

export const getAvisoPrincipalPrincipal = async (req:any, res:any) => {

    const avisos = await AvisoPrincipal.findOne({type: "principal"})

    if (avisos) {
        res.json(avisos)
    } else {
        res.json(false)
    }
}

export const deleteAvisoPrincipal = async (req:any, res:any) => {

    const { id } = req.params

    if (!id || id.length < 24) {
        res.json(false)
        return
    }

    cloudConfig()

    const aviso = await AvisoPrincipal.findByIdAndDelete(id)
    await cloudinary.uploader.destroy(aviso.publicID)

    if (aviso.type == "principal") {
        await AvisoPrincipal.findOneAndUpdate({}, {type: "principal"})
    }

    res.json(true)
}

export const putAvisoPrincipal = async (req:any, res:any) => {
    const token = req.session.token

    if (!token) return res.send({error: "No has accedido"})

    const { title, description, link, type} = req.body
    const { id } = req.params

    if (id.length < 24 ) return res.send(false)

    let titleEsc = title
    let descriptionEsc = description

    const aviso = await AvisoPrincipal.findById(id)
    if (req.file) {
        cloudConfig()
        
        const urlCompressed = join(__dirname, `../../public/uploads/${uuidv4()}.webp`)
        await sharp(req.file.path).webp({quality: compressionQuality}).toFile(urlCompressed)
        
        await unlink(req.file.path)
        const image = await cloudinary.uploader.upload(urlCompressed)
        await unlink(urlCompressed)

        await cloudinary.uploader.destroy(aviso.publicID)

        if (aviso.type == "secundario" && aviso.type !== type) {

            await AvisoPrincipal.findOneAndUpdate({type: "principal"}, {type: "secundario"})
            await AvisoPrincipal.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, link, type, imageURL: image.secure_url, publicID: image.public_id})

        } else if (aviso.type == "principal" && aviso.type !== type)  {

            await AvisoPrincipal.findOneAndUpdate({}, {type: "principal"})
            await AvisoPrincipal.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, link, type, imageURL: image.secure_url, publicID: image.public_id})
        } else  {
            await AvisoPrincipal.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, link, type, imageURL: image.secure_url, publicID: image.public_id})
        }
    } else {
        if (aviso.type == "secundario" && aviso.type !== type) {

            await AvisoPrincipal.findOneAndUpdate({type: "principal"}, {type: "secundario"})
            await AvisoPrincipal.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, link, type})

        } else if (aviso.type == "principal" && aviso.type !== type)  {

            await AvisoPrincipal.findOneAndUpdate({}, {type: "principal"})
            await AvisoPrincipal.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, link, type})
        } else  {
            await AvisoPrincipal.findByIdAndUpdate(id, {title: titleEsc, description: descriptionEsc, link, type})
        }
        
    }

    if (type == "secundario") {
        const typePrinMatch = await AvisoPrincipal.findOne({ type: "principal" })
        if (!typePrinMatch) await AvisoPrincipal.findOneAndUpdate({ type: "secundario" }, {type: "principal"})
    }

    res.send(true)
}

export const getAvisoPrincipal = async (req:any, res:any) => {
    
    const { id } = req.params

    if (id.length < 24) {
        res.json(false)
        return
    }

    let aviso = await AvisoPrincipal.findById(id)
    
    res.json(aviso)
}

export const postAvisoPrincipal = async (req:any, res:any) => {
    cloudConfig()

    const { title, description, link } = req.body

    if (!req.file) return res.send({error: "Image required"})

    const typeSplitImage = req.file.mimetype.split("/")
    if (typeSplitImage[0] != "image") return res.send({error: "Wrong file type"})

    const urlCompressed = join(__dirname, `../../public/uploads/${uuidv4()}.webp`)
    await sharp(req.file.path).webp({quality: compressionQuality}).toFile(urlCompressed)

    await unlink(req.file.path).catch(err => console.log(err))
    const result = await cloudinary.uploader.upload(urlCompressed)
    await unlink(urlCompressed)
    
    const aviso = new AvisoPrincipal()
    aviso.title = title
    aviso.description = description
    aviso.link = link
    aviso.imageURL = result.secure_url
    aviso.publicID = result.public_id

    let match = await AvisoPrincipal.findOne({type: "principal"})
    
    if (match) {
        await AvisoPrincipal.findOneAndUpdate({type: "principal"}, {type: "secundario"}) 
    }

    aviso.type = "principal"

    aviso.save()

    res.json(true)
}

export const getAvisosPrincipales = async (req:any, res:any) => {
    const avisos = await AvisoPrincipal.find()
    res.json(avisos)
}