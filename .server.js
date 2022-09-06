const express = require("express");
const app = express();
const PORT = process.env.PORT || 3006;

app.get("/", async (req, res) => {
    res.send("Werking.");
})

app.listen(PORT, () => console.log("doing the thing fr fr"))