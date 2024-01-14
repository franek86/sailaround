import express from "express";
import { createCountry, getCountires } from "../controllers/country.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("countryIcon"), createCountry);
router.get("/", getCountires);

export default router;
