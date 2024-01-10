import express from 'express';
import {createYacht, deleteYacht, editYacht, getYacht} from '../controllers/yacht.controller.js'



const router = express.Router();

router.post('/create', createYacht);
router.patch('/edit:id', editYacht);
router.get('/:id', getYacht);
router.delete('/:id', deleteYacht);


export default router;