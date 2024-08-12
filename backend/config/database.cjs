const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// charge les variables d'environnement
dotenv.config();

// création d'une instance de sequelize avec les paramètres nécéssaires à la connexion
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_DIALECT:", process.env.DB_DIALECT);

// Test de la connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
