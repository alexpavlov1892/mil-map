// require('dotenv').config();
// const { Client } = require('pg');

// const client = new Client({
//     host: process.env.PG_HOST,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE
// });

// client.connect()
//     .then(() => console.log('Connected to database'))
//     .catch(err => console.error('Connection error', err.stack));

// module.exports = client;

// client.query('SELECT * FROM marker', (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     } else {
//         console.log(err.message);
//     }
//     client.end();
//     })

