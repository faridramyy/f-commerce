import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = {};
  next();
});

router.get("/", (req, res) => res.render("./index"));
router.get("/signin", (req, res) => res.render("./authentication/signin"));
router.get("/signup", (req, res) => res.render("./authentication/signup"));
router.get("/cooperate_signin", (req, res) =>
  res.render("./authentication/cooperate_signin")
);
router.get("/forget_password", (req, res) =>
  res.render("./authentication/forget_password")
);
router.get("/two_step_verification", (req, res) =>
  res.render("./authentication/two_step_verification")
);

router.get("/contact", (req, res) => res.render("./contact"));
router.get("/cart", (req, res) => res.render("./cart"));
router.get("/shop", (req, res) => res.render("./shop"));
router.get("/checkout", (req, res) => res.render("./checkout"));
router.get("/product_details", (req, res) => res.render("./product_details"));
router.get("/account", (req, res) => res.render("./account"));

export default router;
