//Database config file: running as localhost @ Port No. 5432
const Pool = require ("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "Postgres",
    host: "localhost",
    port: 5432,
    database: "aiq"
});
module.exports = pool;
