const { Poem } = require("../../models");
const router = require("express").Router();
const { withAuth } = require("../../utils");

/**
 * Create a Poems
 * /api/Poem
 */
router.post("/", withAuth, async (req, res) => {
  const { title, image, description } = req.body;
  const UserId = req.session.userId;

  try {
    const newPoem = await Poem.create({
      title,
      image,
      author: "Dan Gross - Best Author Ever",
      description,
      UserId,
    });

    res.json(newPoem);
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 26 ~ router.post ~ error", error);
    return res
      .status(500)
      .json({ message: "Something has gone terribly wrong" });
  }
});

/**
 * Get Poems by User
 * /api/Poem
 */
router.get("/", withAuth, async (req, res) => {
  const UserId = req.session.userId;

  try {
    const dbPoems = await Poem.findAll({
      where: {
        UserId,
      },
    });
    dbPoems.map((Poem) => Poem.get({ plain: true }));
    res.status(200).json(dbPoems);
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 26 ~ router.post ~ error", error);
    return res
      .status(500)
      .json({ message: "Something has gone terribly wrong" });
  }
});

module.exports = router;
