import { Schema, model, Model } from "mongoose";

interface iAviso {
    title: string,
    description: string,
    link: string,
    type: string,
    imageURL: string,
    publicID: string
}

type AvisoModel = Model<iAviso, {}, {}>

const AvisoSchema = new Schema<iAviso>({
    title: { type: String },
    description: { type: String },
    link: { type: String },
    type: { type: String },
    imageURL: { type: String },
    publicID: { type: String }
}, {
    timestamps: true,
    versionKey: false
})
export default model<iAviso, AvisoModel>("AvisoPrincipal", AvisoSchema)