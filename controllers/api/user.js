
const { User } = require("../../models");

const router = require("express").Router();

router.get("/", async (req,res) => {
  if (req.session.loggedIn) {
    return res.json({ message: "Logged in!" });
  } else {
    return res.json({ message: "Logout!" });
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res
      .status(400)
      .json({ message: "more info needed!" });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const isValidPassword = user.checkPassword(password);

    if (isValidPassword) {
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        return res.status(200).json(user);
      });
    } else {
      res.status(404).json({ message: "try again" });
    }
  } catch (error) {
 
    return res
      .status(500)
      .json({ message: "error, run!" });
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});
module.exports = router;