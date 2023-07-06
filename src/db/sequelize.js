// Ce fichier gère la configuration de la base de données et l'initialisation du modèle User.
const { Sequelize, DataTypes} = require('sequelize');
// récupération des prorpiétés de sequelize sequelize et dataypes
const UserModel = require('../models/users');
// Importation du modèle d'utilisateur (users.js)  
// Import the User model (users.js)




const sequelize = new Sequelize('dsi_sensibilisation', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
// Création d'une instance Sequelize avec les informations de connexion à la base de données MySQL
// Create a Sequelize instance with the connection information to the MySQL database

const User = UserModel(sequelize, DataTypes);
// Création du modèle User en utilisant le modèle UserModel et ses paramètres sequelize et DataTypes
// Create the User model using the UserModel and its sequelize and DataTypes parameters



sequelize
  .query('SELECT 1')
  .then(([result]) => {
    console.log('Connexion à la base de données réussie !');
  })
  .catch(error => {
    console.error('Erreur de connexion à la base de données :', error);
  });
// Cette requête sélectionne  la valeur 1 pour vérifier si la connexion à la base de données est réussie
// This query selects the value 1 to check if the database connection is successful


module.exports = { 
    User
 }
// Exportation du modèle User pour pouvoir l'utiliser ailleurs dans le code.


