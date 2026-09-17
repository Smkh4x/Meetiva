import register from "./auth.controller";

import express from 'express';

const router = express.Router();

router.post("/auth/send-code", register.sendVerificationCode)
router.post("/auth/verify-code", register.verifyCode)
router.post("/auth/register", register.register);
router.post("/auth/login", register.login);