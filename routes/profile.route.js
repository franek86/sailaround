import express from 'express';
import { editProfile, userProfile } from '../controllers/profile.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/', verifyToken(['admin','editor','user']), userProfile);
router.patch('/edit', verifyToken(['admin','editor','user']), editProfile);

export default router;