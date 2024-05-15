import express from 'express';
import { actualizarEstudiante } from '../controller/estudiantesController.js';

const router = express.Router();

router.put('/:nombre', actualizarEstudiante);

export default router;