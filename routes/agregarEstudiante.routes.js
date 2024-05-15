import express from 'express';
import { agregarEstudiante } from '../controller/estudiantesController.js';

const router = express.Router();

router.post('/', agregarEstudiante);

export default router;