require("dotenv").config();
const express = require("express");
const api = express();
const pg = require("pg");
api.use(express.json());
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
    );
    next();
});
const pgPool = new pg.Pool({
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: 5432,
});
api.get("/api/licens", (req, res) => {
    console.log(req.query);
    const query = {
        text:
            `SELECT * FROM public.licens WHERE licens=$1`,
        values: [req.query.licens],
    };

    pgPool.connect((err, client) => {
        if (err) {
            console.log(err);
        } else {
            client
                .query(query)
                .then((resp) => {
                    res.send(resp.rows);
                })
                .catch((e) => {
                    console.error(e.stack);
                });
        }
    });
});
api.listen(8000, () => {
    console.log(process.env.PG_DATABASE);
});
