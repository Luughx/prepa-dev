import jwt, { decode } from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

interface Decoded {
    id: string,
    isOwner: boolean
}

export const verifyToken = async (req:any, res:any, next:any) => {
    try {
        const token = req.session.token

        //console.log(token)
    
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET) as Decoded
            
            const user = await User.findById(decoded.id)
            //console.log(user)
            
            if (!user) {
                next()
                return
            } else {
                req.session.userId = decoded.id
                next()
                return
            }
        }
        
    } catch (error) {
        return console.error(error)
    }
}

export const rolePermision = (roles: any) => async (req:any, res:any, next:any) => {
    try {
        const userId = req.session.userId
        delete req.session.userId

        if (userId) {
            const user = await User.findById(userId)
            const rolesDb = await Role.find({_id: {$in: user.roles}})
            let perm = false
        
            for (let i=0; i < rolesDb.length; i++) {
                if (rolesDb[i].name == "admin") {
                    console.log("es admin")
                    perm = true
                    next()
                    return
                }
                for (let s=0; s < roles.length; s++) {
                    if (rolesDb[i].name == roles[s]) {
                        perm = true
                        next()
                        return
                    }
    
                }
            }
        
            if (!perm) {
                next()
                return
            }
        }
    } catch (error) {
        console.error(error)
    }
}