import { Router } from "express";
import { postLoginScores, getDataStudent, deleteDataStudent, postDownloadScores, testPdf } from "../controllers/dashboardController"

const router = Router()

router.get("/dashboard/test", testPdf)
router.post("/dashboard/scores", postLoginScores)
router.post("/dashboard/scores/download", postDownloadScores)
router.get("/dashboard/getstudent", getDataStudent)
router.delete("/dashboard/deletedata", deleteDataStudent)

export default router