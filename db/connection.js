// import mysql
const mysql = require('mysql2');

let db = null;

module.exports = {
    mysql: () => {
        if (!db) {
            db = mysql.createConnection(
                {
                    host: '127.0.0.1',
                    user: 'root',
                    password: '',
                    database: 'business'
                },
                console.log('Connected to the database')
            );
        }
        return db;
    }
};

