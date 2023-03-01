import { Schema, model, Model } from "mongoose"
import bcrypt from "bcryptjs"

interface IUser {
    name: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    roles: object,

    imageURL: string,
    imageCircleURL: string,
    image_publicID: string,

    bannerURL: string,
    banner_publicID: string,
}

interface IUserMethods {
    encryptPassword: (password: string) => Promise<string>,
    matchPassword : (password: string) => Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: {type: String, trim: true},
    lastName: {type: String, trim: true},
    email: {type: String, trim: true},
    password: {type: String},
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    imageURL: {type: String},
    imageCircleURL: {type: String},
    image_publicID: {type: String},
    
    bannerURL: {type: String},
    banner_publicID: {type: String}
    //date: {type: Date, default: Date.now()}
}, {
    timestamps: true,
    versionKey: false
})
/*
UserSchema.method("encryptPassword", async function encryptPassword(password:string) {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password, salt)
    return hash
})

UserSchema.method("matchPassword", async function matchPassword(password:string) {
    return await bcrypt.compare(password, this.password)
})*/

UserSchema.methods.encryptPassword = async function (password: string) {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password, salt)
    return hash
}

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser, UserModel>("User", UserSchema) 