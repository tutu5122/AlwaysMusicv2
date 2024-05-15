import express from 'express';
import { eliminarEstudiante } from '../controller/estudiantesController.js';

const router = express.Router();

router.delete('/:nombre', eliminarEstudiante);

export default router;