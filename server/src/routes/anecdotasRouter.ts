import { Router } from "express";
import { getAnecdotas, postAnecdotasList, postAnecdota, getAnecdotasUser, getAnecdota, deleteAnecdota, getAnecdotasDev, putAnecdotaDev, putAcceptDev } from "../controllers/anecdotasController";
import { cache } from "../config/cache"; 

const router = Router()

router.get("/anecdotas", cache, getAnecdotas)
router.get("/dev/anecdotas", getAnecdotasDev)
router.get("/anecdota/:id", getAnecdota)
router.get("/anecdotas/user/:id", getAnecdotasUser)

router.post("/anecdotasList", postAnecdotasList)
router.post("/anecdotas", postAnecdota)

router.put("/dev/aceptar/anecdota", putAcceptDev)
router.put("/dev/edit/anecdota/:id", putAnecdotaDev)
router.delete("/delete/anecdota/:id", deleteAnecdota)

export default router