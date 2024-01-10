import express from 'express';
import { createBase } from '../controllers/base.controller.js';



const router = express.Router();

router.post('/create', createBase);


export default router;