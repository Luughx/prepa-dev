import { Router } from "express";
import { indexGet, getData } from "../controllers/indexController"

const router = Router()

router.get("/", indexGet)
router.get("/index/data", getData)

export default router