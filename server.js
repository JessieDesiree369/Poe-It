const path = require("path");
const express = require("express");
const session = require("express-session");
const { sequelize, sessionConfig } = require("./config/connection");
const exphbs = require("express-handlebars");
const controllers = require("./controllers");
const helpers = require("./utils/helper.js");

const app = express();
const PORT = process.env.PORT || 3006;
const hbs = exphbs.create({ helpers });

//app.use(app.router);
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(controllers);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("WERE DOING IT!"));
});

// app.get("/", async (req, res) => {
//     res.send("Werking.");
// })

// app.listen(PORT, () => console.log("doing the thing fr fr"))