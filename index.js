import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import frontendRoutes from "./routes/frontend.js";
import categoryRoutes from "./routes/category.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import secrets from "./config/secrets.js";

const app = express();
app.use(express.static("public"));
app.use(express.json()); // to read req.body
app.use(express.urlencoded({ extended: true })); // to read req.body
app.use(cookieParser());
app.set("view engine", "ejs");

const port = secrets.PORT;

app.use(frontendRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.use((req, res, next) => {
  res.status(404).render("404.ejs");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
