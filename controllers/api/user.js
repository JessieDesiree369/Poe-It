
const { User } = require("../../models");

const router = require("express").Router();

router.get("/", async (req,res) => {
  if (req.session.loggedIn) {
    return res.json({ message: "YOURE IN THERE!" });
  } else {
    return res.json({ message: "YOURE OUTTA THERE" });
  }
});

router.post("/", async(req, res) => {
  const { username, email, password}= req.body;
  if (( !username, !email,!password)){
    return res
      .status(400)
      .json({ message: " log in failed"});

  }
  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = newUser.id;
      return res.status(201).json(newUser);
    });
  } catch (error) {
    return res
      .status(500)
      .json({message: "error "});
  }
});

module.exports = router;