import User from "../models/User"
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import { escape } from "lodash";

export const getDataUser = async (req: any, res:any) => {

    const { id } = req.body

    if (!id || id.length < 24) {
        res.json(false)
        return
    } 

    const user = await User.findById(id)
    res.json(user)
    
}

export const getLogout = async (req: any, res:any) => {
    delete req.session.token
    res.send({"message": "Sesión eliminada"})
}

export const postSignin = async (req: any, res:any) => {

    const { email, password } = req.body

    if (!email || !password ) return res.send({error: "Invalid data"})

    const userFind = await User.findOne({email: escape(email).toLowerCase()})
    
    let match
    if (userFind) {
        match = await userFind.matchPassword(escape(password))
    }

    if (userFind && match) {
        
        const rolesDb = await Role.find({_id: {$in: userFind.roles}})
        let owner = false
        
        for (let i=0; i < rolesDb.length; i++) {
            if (rolesDb[i].name == "administrador" || rolesDb[i].name == "moderador") {
                owner = true
            }
        }

        const token = jwt.sign({
            id: userFind._id,
            isOwner: owner
        }, `${process.env.SECRET}`, {
            expiresIn:"30d"
        })
        
        req.session.token = token
        
        const all = {
            userFind, owner
        }
        req.session.save(() => {
            res.json(all)
        })
    } else {
        res.json({"errorMessage": "Datos Inválidos"})
    }

}

export const postSignup = async (req: any, res: any) => {
    const { name, lastName, email, password, confirmPassword } = req.body
    const role = await Role.findOne({name: "usuario"})

    if (!name || !lastName || !email || !password || !confirmPassword) return res.send({error: "Invalid data"})

    
    const matchEmail = await User.findOne({email: email.toLowerCase()})

    if (matchEmail) {
        res.json({"errorMessage":"El correo electrónico ya está en uso"})
        return
    }

    if (name <= 2 || lastName <= 2 || email <= 0 || password <= 6 || confirmPassword <= 6) {
        res.json({"errorMessage":"Hubo algún error"})
        return
    }

    const newUser = new User()
    newUser.name = escape(name)
    newUser.lastName = escape(lastName)
    newUser.email = escape(email).toLowerCase()
    newUser.password = await newUser.encryptPassword(escape(password))
    newUser.roles = [role._id]

    newUser.imageURL = "https://res.cloudinary.com/lughx/image/upload/v1655419645/Estaticos/Users/imagen-usuario_r6h7gy.png"
    newUser.imageCircleURL = "https://res.cloudinary.com/lughx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1655419645/Estaticos/Users/imagen-usuario_r6h7gy.png"
    newUser.image_publicID = "empty"

    newUser.bannerURL = "https://res.cloudinary.com/lughx/image/upload/v1655419644/Estaticos/Users/banner_default_ck5ulm.png"
    newUser.banner_publicID = "empty"
    
    await newUser.save()
    res.json(newUser)
}

export const getVerifyEmail = async (req: any, res: any) => {
    const { id } = req.params
    const match = await User.findOne({email: id})
    res.json(match)
}