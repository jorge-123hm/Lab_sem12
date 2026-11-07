
const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_pagos'
});

// Conectar a la base de datos
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar con MySQL:', error);
        return;
    }

    console.log('Conexión exitosa a MySQL');
});

// Exportar la conexión
module.exports = connection;
