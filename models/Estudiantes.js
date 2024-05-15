import pool from "../db/conexion.js";

export const agregar = async (nombre, rut, curso, nivel) => {
    const client = await pool.connect();
    try {
        await client.query(`INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)`, [nombre, rut, curso, nivel]);
    } catch (error) {
        console.error('Error al agregar estudiante:', error.stack);
    } finally {
        client.end();
    }
};

export const actualizar = async (nombre, rut, curso, nivel) => {
    const client = await pool.connect();
    try {
        await client.query(`UPDATE estudiantes SET rut = $1, curso = $2, nivel = $3 WHERE nombre = $4`, [rut, curso, nivel, nombre]);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error.stack);
    } finally {
        client.end();
    }
};

export const consulta = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM estudiantes");
        console.log('Estudiantes:', res.rows);
        return res.rows;
    } catch (error) {
        console.error('Error al consultar estudiantes:', error.stack);
    } finally {
        client.end();
    }
};

export const consultaRut = async (rut) => {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM estudiantes WHERE rut = $1", [rut]);
        console.log('Estudiantes:', res.rows);
        return res.rows;
    } catch (error) {
        console.error('Error al consultar estudiantes:', error.stack);
    } finally {
        client.end();
    }
};

export const eliminar = async (nombre) => {
    const client = await pool.connect();
    try {
        await client.query(`DELETE FROM estudiantes WHERE nombre = $1`, [nombre]);
    } catch (error) {
        console.error('Error al eliminar estudiante:', error.stack);
    } finally {
        client.end();
    }
};
