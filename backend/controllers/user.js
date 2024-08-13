import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Model MongoDB
import UserSQL from '../models/UserSQL.js';

// Fonction pour l'inscription d'un nouvel utilisateur
export const signup = async (req, res, next) => {
  try {
    // Hachage du mot de passe
    const hash = await bcrypt.hash(req.body.password, 10);

    // Création d'un nouvel utilisateur avec l'email et le mot de passe haché
    const newUser = new User({
      email: req.body.email,
      password: hash,
    });

    // Sauvegarde dans MongoDB
    await newUser.save();

    // Sauvegarde de l'email dans PostgreSQL
    await UserSQL.create({
      email: req.body.email,
    });

    // Succès de l'inscription
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error while creating user:", error);

    // Echec de l'inscription
    const errorMessage = error.message || "An error occurred during signup";
    res.status(500).json({ error: { message: errorMessage } });
  }
};

// Fonction pour la connexion d'un utilisateur existant
export const login = async (req, res, next) => {
  try {
    // Recherche de l'utilisateur dans la base de données MongoDB par son email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Si l'utilisateur n'existe pas, renvoyer une erreur d'authentification
      return res.status(401).json({ message: 'Incorrect email/password pair' });
    }

    // Comparaison du mot de passe fourni avec le mot de passe haché stocké dans la base de données
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      // Si mdp incorrect, renvoie une erreur
      return res.status(401).json({ message: 'Incorrect email/password pair' });
    }

    // Si l'authentification réussit, renvoye l'email de l'utilisateur et un token JWT
    res.status(200).json({
      userId: user.email, // Utilise l'email comme identifiant
      token: jwt.sign(
        { email: user.email }, // Encode l'email dans le token
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
      ),
    });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};

