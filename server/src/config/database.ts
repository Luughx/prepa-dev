import { connect } from "mongoose";

export const connectMongo = async () =>{
    try {
        connect(`${process.env.DB_URL}`)
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}