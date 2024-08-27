const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "simplewine",
  password: process.env.password,
  port: 5432,
});

const getProducts = (request, response) => {
    pool.query("SELECT * FROM customers ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };