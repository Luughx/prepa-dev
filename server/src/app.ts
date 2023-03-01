import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import path from "path";
import mongoStore from "connect-mongo";

import indexRoutes from "./routes/indexRouter"
import usersRoutes from "./routes/usersRouter"
import anecdotasRoutes from "./routes/anecdotasRouter"
import avisosRoutes from "./routes/avisosRouter"
import dashboardRoutes from "./routes/dashboardRouter";

import { createRoles } from "./config/initialSetup";

import { config } from "dotenv"
import { connectMongo } from "./config/database"

config()

connectMongo()
createRoles()

const app = express()

const configCookieProduction = {
    secure: true,
    httpOnly: true,
    path: "/",
    domain: ".daraan.site" 
}

const configCookieDeveloper = {
    secure: false,
    httpOnly: true,
}

app.set("trust proxy", 1)

// Middlewares
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: process.env.STATE == "production" ? configCookieProduction : configCookieDeveloper,    
    store: mongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 30 * 24 * 60 * 60,
        autoRemove: 'interval',
        autoRemoveInterval: 60
    })
}))

const originDevelop = [
    "http://localhost:8080",
    "http://localhost:8082",
    "http://localhost:8081",
    "http://127.0.0.1:8000"
]

const originProduction = [
    "https://www.daraan.site",
    "http://www.daraan.site",
    "http://daraan.site",
    "https://daraan.site",
]

app.use(morgan("dev"))
app.use(cors({
    origin: process.env.STATE == "production" ? originProduction : originDevelop,
    credentials: true,
    exposedHeaders: ["set-cookie"]
}))
app.use(express.json())

// Global variables

// Routes

app.use("/api", indexRoutes)
app.use("/api", usersRoutes)
app.use("/api", anecdotasRoutes)
app.use('/api', avisosRoutes)
app.use('/api', dashboardRoutes)

app.use("/uploads", express.static(path.join(__dirname, "/public/img/uploads")))
app.use("/boleta", express.static(path.join(__dirname, "/public/pdf/uploads")))
app.use("/pdf", express.static(path.join(__dirname, "/public/pdf")))

export default app