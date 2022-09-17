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
  const term = req.params.term;
  const loggedIn = req.session.loggedIn;
  if (!term || term === "...") {
    res.end();
  }

  // ----- Create an empty array with length = 30 (max results)
  // ----- so it can be used in handlebars to generate the
  // ----- correct number of search result blocks
  let emptyArray = [];
  for(let i = 0 ; i < 30 ; i++){
    emptyArray[i] = { id: i };
  }
  res.render("results", {
    loggedIn,
    term,
    emptyArray
  });
});

router.get("/compose", async(req,res)=>{
  const loggedIn =req.session.loggedIn;
  res.render("compose", {
    loggedIn,
  });
});

router.get("/readPoem/:cid", async(req,res)=>{
  const loggedIn = req.session.loggedIn;
  const cid = req.params.cid;
  res.render("readPoem", {
    loggedIn,
    cid
  });
});

module.exports = router;
