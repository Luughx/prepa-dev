import { Schema, Document, model, Model, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface iAviso {
    title: string,
    url: string,
    content: string,
    description: string,
    imageURL: string,
    publicID: string
}

const AvisoSchema = new Schema<iAviso>({
    title: { type: String },
    url: { type: String },
    description: { type: String },
    content: { type: String },
    imageURL: { type: String },
    publicID: { type: String }
}, {
    timestamps: true,
    versionKey: false
})

AvisoSchema.plugin(mongoosePaginate)

interface AvisoModel extends Document, iAviso {} 

export default model<AvisoModel, PaginateModel<AvisoModel>>("Avisohtml", AvisoSchema)