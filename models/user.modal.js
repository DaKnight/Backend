import pool from '../config/database.js'

const user = {
    // Create a new User
    create: (userData, callback) => {
        const sql = 'INSERT INTO users (name, email, contact, password, role, status) VALUES (?, ?, ?, ?, ?, ?)';
        pool.query(sql, [userData.name, userData.email, userData.contact, userData.password, userData.role, userData.status], (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        });
    },

    // Find all users
    findAllUsers: (callback) =>{
        const sql = 'SELECT * FROM users';
        pool.query(sql, (err, results) => {
            if(err) {
                console.log(err);
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Find a user by email
    findByEmail: (email, callback) =>{
        const sql = 'SELECT * FROM users WHERE email = ?';
        pool.query(sql, [email], (err, results) => {
            if(err) return callback(err);
            callback(null, results[0]);
        });
    },

    // Update a user by email
    update: (userData, callback) => {
        const sql = 'UPDATE users SET name = ?, password = ? WHERE email = ?';
        pool.query(sql, [userData.name, userData.password, userData.email], (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        });
    },

    // Delete a user by email
    delete: (userData, callback) => {
        const sql = 'DELETE FROM users WHERE email = ?';
        pool.query(sql, [userData.email], (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        });
    }
};

export default user;