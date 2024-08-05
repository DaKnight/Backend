import pool from '../config/database.js';

const authentication = {
    validate: (userData, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        pool.query(sql, [userData.email], (err, results) => {
            if(err) return callback(err);
            callback(null, results[0]);
        });
    },

};

export default authentication;