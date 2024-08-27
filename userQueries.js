const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "simplewine",
  password: process.env.password,
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM customers ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM customers WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { firstName, lastName, email } = request.body;

  pool.query(
    "INSERT INTO customers (firstName, lastName, email) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { firstName, lastName, email } = request.body;

  pool.query(
    "UPDATE customers SET firstName = $1, lastName = $2, email = $3 WHERE id = $4",
    [firstName, lastName, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM customers WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
