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