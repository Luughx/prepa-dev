import User from "../models/User"
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import { escape } from "lodash";

export const indexGet = (req:any, res:any) => {
    console.log("index")
    res.send("Index")
}

export const getData = async (req:any, res:any) => {
    
    const { token, dataStudent} = req.session

    let data = {} as any

    if (token) {
        const decodedUser = (<any>jwt.verify(req.session.token, `${process.env.SECRET}`))
        const user = await User.findById(decodedUser.id)
        
        const rolesDb = await Role.find({_id: {$in: user.roles}})
        let owner = false
        
        for (let i=0; i < rolesDb.length; i++) {
            if (rolesDb[i].name == "administrador" || rolesDb[i].name == "moderador") owner = true   
        }

        data.user = {
            user, owner
        }
    }

    if (dataStudent) {
        const student = (<any>jwt.verify(dataStudent, `${process.env.SECRET}`))
        data.student = student
    }

    res.send(data)
}