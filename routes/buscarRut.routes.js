import express from 'express';
import { consultarEstudiantePorRut } from '../controller/estudiantesController.js';

const router = express.Router();

router.get('/:rut', consultarEstudiantePorRut);

export default router;