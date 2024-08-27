require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dbProducts = require("./database/productQueries");
const port = 3000;
var cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// API Endpoints for wine products
app.get("/products", dbProducts.getProducts);
app.get("/products/:id", dbProducts.getProductById);
app.post("/products", dbProducts.createProduct);
app.put("/products/:id", dbProducts.updateProduct);
app.delete("/products/:id", dbProducts.deleteProduct);

//
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
