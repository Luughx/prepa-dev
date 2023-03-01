import app from "./app"
//import { connectMongo } from "./config/database"
//connectMongo()

app.listen(process.env.PORT || 3000)
console.log("server iniciado")