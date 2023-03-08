import { Router } from "express";
import { postLoginScores, getDataStudent, deleteDataStudent, getDownloadScores, testPdf } from "../controllers/dashboardController"

const router = Router()

router.get("/dashboard/test", testPdf)
router.post("/dashboard/scores", postLoginScores)
router.get("/dashboard/scores/download", getDownloadScores)
router.get("/dashboard/getstudent", getDataStudent)
router.delete("/dashboard/deletedata", deleteDataStudent)

export default router