const router = require("express").Router();
const userRoutes = require("./user");
const poemRoutes = require("./poem");

router.use("/user", userRoutes);
router.use("/poem", poemRoutes);

module.exports = router;
