import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

export const login = (req, res, next) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if (user === null) { // check si le user existe
        res.status(401).json({message: "Paire identifiant/mot de passe incorrecte"})
    } else {
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) { // check si le mdp est le bon
                res.status(401).json({message: "Paire identifiant/mot de passe incorrecte"})
            } else { // le mdp est correct
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign( // création d'un token pour l'authentification
                        { userId: user._id},
                        "RANDOM_TOKEN_SECRET",
                        { expiresIn: "24h"}
                    )
                })
            }
        })
        .catch(error => res.status(500).json({error}))
    }
  })
  .catch(error => res.status(500).json({error}))
}