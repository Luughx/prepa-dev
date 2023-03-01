import Role from "../models/Role";

export const createRoles = async () => {

    const count = await Role.estimatedDocumentCount()
    
    //const count = 0
    
    if (count > 0) return
    //console.log("entra")
    const values = await Promise.all([
        new Role({name: "usuario"}).save(),
        new Role({name: "administrador"}).save()
    ])

    console.log(values)
}