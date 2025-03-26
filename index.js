import express from "express";

import connectDB from "./config/db.js";

import frontendRoutes from "./routes/frontend.js";
import categoryRoutes from "./routes/category.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

const port = process.env.PORT;

app.use(frontendRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
