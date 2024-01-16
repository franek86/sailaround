import express from "express";
import { createBase, getAllBases } from "../controllers/base.controller.js";

const router = express.Router();

router.post("/create", createBase);
router.get("/", getAllBases);

export default router;
