const express = require("express");
const Event = require('./db'); 

const app = express();
const PORT = process.env.PORT || 80;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.post("/new-event", async (req, res) => {
  try {
    const { day, name, description } = req.body;
    const newEvent = new Event({ 
        day: parseInt(day), 
        name_event: name, 
        description: description 
    });
    await newEvent.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al guardar");
  }
});

app.get("/", async (req, res) => {
  try {
    const docs = await Event.find().sort({ day: 1 });
    const eventsJSON = docs.map(doc => {
      const e = doc.toObject();
      e.id = e._id;
      return e;
    });

    res.render("home", { events: eventsJSON });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    
    const formattedEvent = event.toObject();
    formattedEvent.id = formattedEvent._id; // Lo mismo aquí para view.ejs
    
    res.render("view", { event: formattedEvent });
  } catch (err) {
    res.status(500).send('Error');
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send('Error');
  }
});

app.get("/add-event", (req, res) => {
  res.render("add-event");
});

app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname + "/public/404_static.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor Multicloud escuchando en puerto ${PORT}`);
});