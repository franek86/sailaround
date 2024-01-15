import express from "express";
import { createCountry, getCountries } from "../controllers/country.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("iconFlag"), createCountry);
router.get("/", getCountries);

export default router;
