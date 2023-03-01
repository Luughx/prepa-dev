import { Router } from "express"
import { putAvisohtml, getAvisoshtmlDev, getAvisoshtmlMain, getAvisoshtmlList, deleteAvisohtml, getAvisoshtml, postAvisohtml, getAvisohtml, deleteAvisoPrincipal, getAvisoPrincipal, getAvisosPrincipales, getAvisoPrincipalPrincipal, getAvisosPrincipalesSecundarios, postAvisoPrincipal, putAvisoPrincipal } from "../controllers/avisosController"
import multer from "../config/multer"
import { verifyToken } from "../middlewares/authJwt";
import { cache } from "../config/cache"; 

const router = Router()

const uploadAvisoHtml = multer.fields([{name: "file", maxCount: 1}, {name: "image", maxCount: 1}])

router.post("/dev/aviso-principal/agregar", multer.single("image"), postAvisoPrincipal)

// Avisos html
router.post("/dev/aviso-html/agregar", uploadAvisoHtml, postAvisohtml)
router.put("/dev/aviso-html/editar/:id", multer.single("image"), putAvisohtml)
router.delete("/dev/aviso-html/eliminar/:id", deleteAvisohtml)
router.get("/aviso-html/view/:id", getAvisohtml)
router.get("/avisos-html/lista/:id", cache, getAvisoshtmlList)
router.get("/avisos-html", cache, getAvisoshtml)
router.get("/dev/avisos-html/all", getAvisoshtmlDev)
router.get("/avisos-html/main/:id", cache, getAvisoshtmlMain)

router.get("/dev/aviso-principal/all", verifyToken, getAvisosPrincipales)
router.get("/dev/aviso-principal/all/principales", cache, getAvisoPrincipalPrincipal)
router.get("/dev/aviso-principal/all/secundarios", cache, getAvisosPrincipalesSecundarios)
router.get("/dev/aviso-principal/view/:id", getAvisoPrincipal)

router.put("/dev/aviso-principal/editar/:id", multer.single("image"), putAvisoPrincipal)
router.delete("/dev/aviso-principal/eliminar/:id", deleteAvisoPrincipal)

export default router