import register from "./auth.controller.js";
import auth_validate from "./middleware/auth.validator.js";
import {email, verifyCode, register_auth} from '../z_shema/auth.register.js'


import express from 'express';

const router = express.Router();

router.post("/send-code",auth_validate(email), register.sendVerificationCode)// generic middelware
router.post("/verifyCode",auth_validate(verifyCode), register.verifyCode)// generic middelware
router.post("/verify-username", register.verifyUserName); // verify user name
// router.get("/interests",)
router.post("/register",auth_validate(register_auth), register.register);
router.post("/login", register.login);


export default router