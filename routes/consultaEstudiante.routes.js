import express from 'express';
import { consultarEstudiantes } from '../controller/estudiantesController.js';

const router = express.Router();

router.get('/', consultarEstudiantes);

export default router;