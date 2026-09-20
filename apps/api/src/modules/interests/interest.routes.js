import express from "express";
import interest from "./interest.controller";

const router = express.Router();

router.post("interests/validate", interest);

export default router