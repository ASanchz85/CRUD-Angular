const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
  titular: String,
  numeroTarjeta: String,
  fechaCaducidad: String,
  cvv: Number,
  fechaCreacion: Date,
});

module.exports = mongoose.model('cuenta', entrySchema);
