const express = require("express");
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 80;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.post("/new-event", async(req, res) => {
  try{
    const{ day, name, description } = req.body;

    await pool.query(
      "INSERT INTO events (day, name_event, description) VALUES ($1, $2, $3)",
      [day, name, description]
    );

    res.redirect("/");
  }catch(err){
    console.error(err);
    res.status(500).send("Internal Server Error");
  }

});

app.get("/event/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Event not found');
    }
    
    const event = result.rows[0];
    
    res.render("view", { event: event });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
app.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

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