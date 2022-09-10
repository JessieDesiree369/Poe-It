const router = require("express").Router();
//const axios = require("axios");
const { Book } = require("../../models");

router.get("/", async (req, res) => {
  const loggedIn = req.session.loggedIn;
  console.log("🚀 ~ file: home.js ~ line 7 ~ router.get ~ loggedIn", loggedIn);

  res.render("home", {
    loggedIn,
  });
});

router.get("/profile", async (req, res) => {
  const UserId = req.session.userId;
  const loggedIn = req.session.loggedIn;

  try {
    const dbBooks = await Book.findAll({
      where: {
        UserId,
      },
    });
    const books = dbBooks.map((book) => book.get({ plain: true }));
    res.render("profile", {
      books,
      loggedIn,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 26 ~ router.post ~ error", error);
    return res
      .status(500)
      .json({ message: "Something has gone terribly wrong" });
  }
});

module.exports = router;