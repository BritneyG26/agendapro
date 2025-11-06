const { Pool } = require('pg');

const pool = new Pool({
    user: 'vm-acess',
    host: '10.50.0.3', //Cambiar a IP privada luego
    database: 'node-agenda-db',
    password: 'Edu123-1',
    port: 5432,
    ssl: false
});

module.exports = pool