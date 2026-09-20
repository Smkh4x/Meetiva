import getMe from "./user.controller.js";
import user_validator from "./user.middleware.js";
import express from 'express';


const router = express.Router()

router.get("users/me",user_validator, getMe);

export default router