//import fetch from 'node-fetch';

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
  //const term =req.params.term;
  //console.log(`term: ${term}`);

});
//return res.json(poems);
//});

router.get("/login", async(req,res)=>{
  const loggedIn =req.session.loggedIn;
  res.render("login", {
    loggedIn,
  });
});

router.get("/favorites", async(req,res)=>{
  const loggedIn =req.session.loggedIn;
  res.render("profile", {
    loggedIn,
  });
});

router.get("/compose", async(req,res)=>{
  const loggedIn =req.session.loggedIn;
  res.render("compose", {
    loggedIn,
  });
});

router.get("/results/:term", async(req,res)=>{
  const term =req.params.term;
  const loggedIn =req.session.loggedIn;
  if (!term || term === "...") {
    res.end();
  }
  res.render("results", {
    loggedIn,
  });
});

module.exports = router;
