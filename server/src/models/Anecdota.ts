import { Schema, Document, model, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IAnecdota extends Document {
    title: String,
    description: String,
    userID: String,
    verified: Boolean,
    info: String,
    author: String,
    
    image_imageURL: String,
    image_publicID: String,
}

const AnecdotaSchema = new Schema({
    title: {type: String, trim: true},
    description: {type: String, trim: true},
    userID: {type: String},
    verified: {type: Boolean},
    info: {type: String, trim: true},
    author: {type: String, trim: true},
    
    image_imageURL: {type: String},
    image_publicID: {type: String},
}, {
    timestamps: true,
    versionKey: false
})


AnecdotaSchema.plugin(mongoosePaginate)

interface AnecdotaModel extends Document, IAnecdota {} 

export default model<AnecdotaModel, PaginateModel<AnecdotaModel>>("Anecdota", AnecdotaSchema)