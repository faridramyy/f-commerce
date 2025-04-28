import express from "express";
import User from "../models/User.js";
import secrets from "../config/secrets.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.use(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.locals.user = null;
      return next();
    }

    const decoded = jwt.verify(token, secrets.JWT_SECRET);

    // Fetch user to verify they still exist
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.locals.user = null;
      return next();
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.locals.user = null;
    return next();
  }
});

router.get("/customer", (req, res) => res.redirect("/"));
router.get("/", (req, res) => res.render("./index"));

router.get("/signin", (req, res) => res.render("./authentication/signin"));
router.get("/signup", (req, res) => res.render("./authentication/signup"));
router.get("/forget_password", (req, res) =>
  res.render("./authentication/forget_password")
);
router.get("/otp", (req, res) => {
  const email = req.query.email; // Access email from query string
  if (!email) {
    return res.status(400).send("Email is required");
  }
  res.render("./authentication/otp", { email });
});

router.get("/contact", (req, res) => res.render("./contact"));
router.get("/cart", (req, res) => res.render("./cart"));
router.get("/shop", (req, res) => res.render("./shop"));
router.get("/checkout", (req, res) => res.render("./checkout"));
router.get("/product_details", (req, res) => res.render("./product_details"));
router.get("/account", (req, res) => res.render("./account"));

export default router;
