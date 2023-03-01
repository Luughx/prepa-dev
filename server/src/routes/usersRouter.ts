import { Router } from "express";
import { getLogout, postSignup, getDataUser, postSignin, getVerifyEmail } from "../controllers/usersController"

const router = Router()

router.post("/usuarios/getDataUser", getDataUser)

// Main

router.get("/logout", getLogout)
router.post("/usuarios/iniciar-sesion", postSignin)
router.post("/usuarios/registrarse", postSignup)
router.get("/usuarios/email-verificar/:id", getVerifyEmail)

export default router