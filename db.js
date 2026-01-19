const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://britney94_db_user:BratzPixiez.@cluster0.fizl8r0.mongodb.net/agendapro?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

const eventSchema = new mongoose.Schema({
  day: Number,           
  name_event: String,    
  description: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;