import { Router } from "express";
import { postLoginScores, getDataStudent, deleteDataStudent, getDownloadScores, testPdf, deleteFileScores } from "../controllers/dashboardController"

const router = Router()

router.post("/dashboard/scores", postLoginScores)
router.get("/dashboard/test", testPdf)
router.get("/dashboard/scores/download", getDownloadScores)
router.get("/dashboard/getstudent", getDataStudent)
router.delete("/dashboard/scores/delete", deleteFileScores)
router.delete("/dashboard/deletedata", deleteDataStudent)

export default router