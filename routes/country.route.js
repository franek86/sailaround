import express from "express";
import { body } from "express-validator";
import { createCountry, deleteCountry, getCountries, getCountriesWithBaseCount } from "../controllers/country.controller.js";

import { upload } from "../middleware/multer.js";
import { handleValidationResult } from "../middleware/validation.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("iconFlag"),
  [
    body("name").notEmpty().withMessage("Country name is required"),
    body("shortCountryCode").notEmpty().withMessage("Short code (e.g EN) is required"),
    body("longCountryCode").notEmpty().withMessage("Long code (e.g ENG) is required"),
  ],
  handleValidationResult,
  createCountry
);
router.get("/", getCountries);
router.get("/countCountriesBases", getCountriesWithBaseCount);
router.delete("/:id", deleteCountry);

export default router;
