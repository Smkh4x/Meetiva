import getMe from "./user.controller";
import express from 'express';


const router = express.Router()

router.get("/me", getMe);