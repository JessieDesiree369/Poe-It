const router = require("express").Router();
const axios = require("axios");
const { Poem } = require("../../models");

router.get("/", async(req,res)=>{
  const loggedIn = req.session.loggedIn;

  res.render("home",{
    loggedIn,
  });

});

router.get("/search/:term", async(req,res)=>{
  const term =req.params.term;



  const axiosResponse = await axios.get(`https://thundercomb-poetry-db-v1.p.rapidapi.com/?q=${term}`);

  const poems =axiosResponse.data.items.map((item)=>{
    return{
      poemId: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      lines: item.volumeInfo.lines,
    };
    // where does the volumeInfo come from?
  });
  return res.json(poems);
});

router.get("/login", async(req,res)=>{
  const loggedIn =req.session.loggedIn;
  res.render("login", {
    loggedIn,
  });
});

module.exports = router;
