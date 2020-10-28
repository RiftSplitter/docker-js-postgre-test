const express = require('express');
const app = express();
const Pool = require('pg').Pool;

const hostname = '127.0.0.1';
const port = 3010;

app.get('/', async (req, res) => {
    let retries = 5;
    let pool;

    try {
        // console.log('creating connection to db');
        pool = new Pool({
            user: 'snowhaven',
            host: 'db',
            database: 'counterdb',
            password: 'snow',
            port: 5432,
        });
    }
    catch (err) {
        console.error(err);
    };
    
    // console.log('succesfully connected to db');
    // pool.query('SELECT * FROM toggle', (error, results) => {
    //     if (error) {
    //         throw error;
    //     }
    //     console.log('OUTPUT: ', results.rows);
    //     res.status(200).json(results.rows);
    // });
    pool.connect((err, client, release) => {
        console.log('testing connect to db');
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        client.query('select * from toggle', (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          console.log(result.rows)
        })
    });
});

app.listen(port, () => {
    console.log(`running on ${hostname}:${port}`);
});

