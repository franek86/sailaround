import express from 'express';
import { createCountry } from '../controllers/country.controller.js';



const router = express.Router();

router.post('/create', createCountry);


export default router;