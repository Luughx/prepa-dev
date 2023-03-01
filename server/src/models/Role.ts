import { Schema, model, Model } from "mongoose";

interface iRole {
    name: string
}

type RoleModel = Model<iRole, {}, {}>

const roleSchema = new Schema<iRole>({
    name: { type: String }
}, {
    versionKey: false
})

export default model<iRole, RoleModel>("Role", roleSchema)