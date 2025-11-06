const pool = require('./db');

async function testConnection() {
    try{
        const res = await pool.query('SELECT NOW()');
        console.log('Success ', res.rows[0]);
        process.exit(0);
    }catch (err){
        console.error(err);
        process.exit(1);
    }
}

testConnection();