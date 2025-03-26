import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/cart", (req, res) => res.render("cart"));
router.get("/category", (req, res) => res.render("category"));
router.get("/checkout", (req, res) => res.render("checkout"));
router.get("/product_details", (req, res) => res.render("product_details"));
router.get("/account", (req, res) => res.render("account"));

export default router;
