const { Pool } = require('pg');

const pool = new Pool({
    user: 'vm-acess',
    host: '192.168.1.134', //Cambiar a IP privada luego
    database: 'node-agenda-db',
    password: 'Edu123-1',
    port: 5432,
    ssl: false
});

module.exports = pool