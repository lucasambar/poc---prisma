import pkg from 'pg';
const { Pool } = pkg;

export const connection = new Pool({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"Lu050903",
    database:"people_manegament"
})