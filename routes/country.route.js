import express from "express";
import { body } from "express-validator";
import { createCountry, getCountries } from "../controllers/country.controller.js";

import { upload } from "../middleware/multer.js";
import { handleValidationResult } from "../middleware/validation.js";

const router = express.Router();

router.post("/create", upload.single("iconFlag"), [body("name").notEmpty().withMessage("Country name is required"), body("shortFlag").notEmpty().withMessage("Short flag (e.g EN) is required"), body("longFlag").notEmpty().withMessage("Long flag (e.g ENG) is required"), body("iconFlag").notEmpty().withMessage("Icon/Image flag is required")], handleValidationResult, createCountry);
router.get("/", getCountries);

export default router;
