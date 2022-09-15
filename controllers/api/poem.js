const { Poem } = require("../../models");
const router = require("express").Router();
const { withAuth } = require("../../utils");


//  Create a Poems

router.post("/", withAuth, async (req, res) => {
  const { title, image, description } = req.body;
  const UserId = req.session.userId;

  try {
    const newPoem = await Poem.create({
      title,
      image,
      author: "James Baldwin ",
      description,
      UserId,
    });

    res.json(newPoem);
  } catch (error) {
   
    return res
      .status(500)
      .json({ message: "oops! something is wrong" });
  }
});


  // Get Poems by User

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
    
    return res
      .status(500)
      .json({ message: "try again" });
  }
});

module.exports = router;
