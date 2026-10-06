import user_controller from "./user.controller.js";
import user_validator from "./user.middleware.js";
import express from 'express';


const router = express.Router()

router.post("/me",user_validator, user_controller.me);

export default router