const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors")

app.use(cors())
app.set("/", "html");
app.use(express.static(path.join(__dirname, "/")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(8000, () => {
    console.log("Listening on http://localhost:8000");
});
