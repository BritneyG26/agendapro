const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home");
});

app.use(function(req,res,next){
    console.log("[SYSTEM] User reached 404");
    res.status(404);
    res.sendFile(path.join(__dirname + "/public/404_static.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});