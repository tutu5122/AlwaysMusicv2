import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
    
    user: 'postgres',
    host: 'localhost',
    database: 'music', 
    password: '1234',
    port: 5432

 });

export default pool;


// la base de dato que cree para el desfio 
// CREATE DATABASE music;

// CREATE TABLE estudiantes (
//     id SERIAL PRIMARY KEY,
//     Nombre VARCHAR(100),
//     Rut VARCHAR(20),
//     Curso VARCHAR(50),
//     Nivel VARCHAR(50)
// );