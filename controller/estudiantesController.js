import { agregar, actualizar, consulta, consultaRut, eliminar } from '../models/Estudiantes.js';

export const agregarEstudiante = async (req, res) => {
    const { nombre, rut, curso, nivel } = req.body;
    try {
        await agregar(nombre, rut, curso, nivel);
        res.status(201).send('Estudiante agregado correctamente');
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const actualizarEstudiante = async (req, res) => {
    const { nombre } = req.params;
    const { rut, curso, nivel } = req.body;
    try {
        await actualizar(nombre, rut, curso, nivel);
        res.status(200).send('Estudiante actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const consultarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await consulta();
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al consultar estudiantes:', error);
        res.status(500).send('Error interno del servidor');
    }
};


export const consultarEstudiantePorRut = async (req, res) => {
    const { rut } = req.params;
    try {
        const estudiantes = await consultaRut(rut);
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al consultar estudiante por rut:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const eliminarEstudiante = async (req, res) => {
    const { nombre } = req.params;
    try {
        await eliminar(nombre);
        res.status(204).send('Estudiante eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        res.status(500).send('Error interno del servidor');
    }
};