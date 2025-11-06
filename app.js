const express = require("express");
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 80;
const path = require("path");

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.get("/", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM events ORDER BY day ASC");
    const eventsJSON = result.rows;

    console.log(eventsJSON)
    res.render("home", {events: eventsJSON});
  }catch(err){
    console.log(eventsJSON)
    console.error(err);
    res.status(500).send('Internal Server Error')
  }
});

app.get("/add-event", (req, res) => {
  res.render("add-event");
});


app.use(function(req,res,next){
    console.log("[SYSTEM] User reached 404");
    res.status(404);
    res.sendFile(path.join(__dirname + "/public/404_static.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});