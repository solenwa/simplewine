const dbProducts = require("./productQueries");

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
