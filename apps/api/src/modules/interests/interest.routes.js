import express from "express";
import interest from "./interest.controller.js";

const router = express.Router();

router.get("/get-interests", interest.get_interest);


export default router