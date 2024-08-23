const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "simplewine",
  password: env.password,
  port: 5432,
});

const getProducts = (request, response) => {
  pool.query("SELECT * FROM prodects ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProductById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM products WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createProduct = (request, response) => {
  const { name, price, description, stockQuantity } = request.body;

  pool.query(
    "INSERT INTO products (name, price, description, stockQuantity) VALUES ($1, $2, $3, $4)",
    [name, price, description, stockQuantity],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Product added with ID: ${results.insertId}`);
    }
  );
};

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, price, description, stockQuantity } = request.body;

  pool.query(
    "UPDATE products SET name = $1, price = $2, description = $3, stockQuantity = $4 WHERE id = $5",
    [name, price, description, stockQuantity, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Product modified with ID: ${id}`);
    }
  );
};

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM products WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Product deleted with ID: ${id}`);
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
