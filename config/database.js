import mysql from 'mysql';

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "CMS",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;