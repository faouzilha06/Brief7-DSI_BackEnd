// Ce code exporte une fonction qui définit une route GET /user_tests dans une application Express
const { User } = require("../db/sequelize");//pour récupérer la liste des utilisateurs = classe User depuis le fichier"DB/sequelieze = ORM pour interagir avec la BD

module.exports = (app) => {
    // Module exporte 1 fonction instance d'express en paramètre/permet d'ajouter à l'application Express
    app.get('/user_tests', (req, res) => {//defini 1 requete GET sur le chemin User_test, quand elle est appelée, fonctin de rappel spécifiée est exécutée
        User.findAll()//à l'intérieur méthode est appelée pour rechercher ts les utilisateurs dans la BD avec sequelize
        .then(users => {//recupère le [] des utilisateurs pris dans le paramètre (users)
            // enregistre une fonction de rappel qui sera exécutée lorsque la méthode findAll() sera résolue avec succès. La fonction de rappel prend un paramètre users, qui est un tableau contenant tous les utilisateurs récupérés.
            const message = 'La liste des users a bien été récupérée.'//message indiquant le []des utilisateurs récupérés
            res.json({ message, data: users});//réponse JSON est renvoyé contenant le message et les données utilisateurs récupérés
            // Envoie une réponse JSON contenant le message et les données des utilisateurs récupérés.
        })
    })
}
//GET  =  permet de récupérer la liste des utilisateurs depuis BD
//quand on effectue 1 requête GET vers l'URL "/user_tests".
//JSON renvoie la réponse  contenant  un message indiquant le succès et les données des utilisateurs récupérés.