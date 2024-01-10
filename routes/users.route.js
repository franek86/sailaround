import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getUsers } from '../controllers/users.controller.js';
import { paginationMiddleware } from '../middleware/pagination.js';


const router = express.Router();

router.get('/', verifyToken(['admin']), paginationMiddleware(), getUsers);



export default router;