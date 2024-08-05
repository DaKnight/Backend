import mysql from 'mysql';


const createUserTable = `
        CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            contact VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        );
    `;

const createSessionTable = `
        CREATE TABLE IF NOT EXISTS session(
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
        );
    `;

function setUpDatabase() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            process.exit(1);
        }

        connection.query('CREATE DATABASE IF NOT EXISTS CMS', (err, result) => {
            if (err) {
                console.error('Error creating database:', err);
                process.exit(1);
            }
            console.log('Database created or already exists.');

            connection.query('USE CMS', (err, result) => {
                if (err) {
                    console.error('Error using database:', err);
                    process.exit(1);
                }

                connection.query(createUserTable, (err, result) => {
                    if (err) {
                        console.error('Error creating users table:', err);
                        process.exit(1);
                    }
                    console.log('Users table created or already exists.');

                    connection.query(createSessionTable, (err, result)=>{
                        if(err) {
                            console.error('Error create sessions table: ', err);
                            process.exit(1);
                        }
                        console.log('Sessions table created or already exists.');
                        
                        connection.end((err) => {
                            if (err) {
                                console.error('Error closing the connection:', err);
                                process.exit(1);
                            }
                            console.log('Database setup completed.');
                            process.exit(0);
                        });
                    });
                });
            });
        });
    });
}

export default setUpDatabase;
