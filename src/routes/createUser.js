const { User } = require('../db/sequelize');
// const auth = require("../auth/auth");
const { ValidationError, UniqueConstraintError} = require('sequelize');
const bcrypt = require('bcrypt');
// import du models user de Sequelize, modules error et de bcrypt
// imports the required modules

module.exports = (app) => {
  // ajout de la route à express
  app.post('/user_tests', (req, res) => {
    // définition de la route post/user_tests. Exécution de la fonction lors de la requête post
    // Defining the POST route '/user_tests'
    var password = req.body.password;
    var username = req.body.username;
    // récupération en dur des informations du corps de la requête
    // Retrieving the password and username from the request body
    bcrypt.hash(password , 10) 
      .then(hash => {
        User.create({ username: username , password: hash})
      .then(users => {
        const message = `L\' user  a bien été crée.`
        res.json({ message, data: users })
      });
      // hashage du mdp avec le module bcrypt => paramètres: passwordet tours de salages. Renvoie d'une promesse avec hashage du mdp et enregistrement avec create d'un model user en bdd, avec le mdp haché
      // The password is hashed using the bcrypt.hash function with a cost factor of 10. The function returns a promise resolved with the hashed password
    })
      .catch(error => {
        // erreur dans la chaîne de promesse
        if(error instanceof ValidationError){ //39 vérifions s'il s'agit d'une erreur de validation de sequelize, si oui c'est de la faute du client --> erreur 4000
          return res.status(400).json({message: error.message, data: error}) // 39 on passe le message d'erreur défini au niveau de notre validateur directement dans l'erreur envoyé au client --> pas de doublons dans les messages d'érreurs et tout reste centralisé
        }
        if(error instanceof UniqueConstraintError){ //47
          return res.status(400).json({message : error.message, data: error})
        }
        const message = 'L\' utilisateur n\a pas pu être ajouté. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
}