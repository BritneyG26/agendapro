const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Servidor Node.js funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});