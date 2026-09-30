import express from "express";
import interest from "./interest.controller.js";

const router = express.Router();

router.post("/validate", interest);


export default router