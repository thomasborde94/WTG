// setting up mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://thomasborde944:krYSEW04ioiVaakq@cluster0.lmqaaok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  module.exports = connectDB;