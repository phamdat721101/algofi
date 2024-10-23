import { Router, Request, Response } from 'express';
import { AlgoFiController } from '../controllers/AlgoFiController';


const router = Router();
const AlgoFiController = new AlgoFiController();


router.post('/', AlgoFiController.createCapital);

export default router;