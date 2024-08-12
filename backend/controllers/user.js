import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Model MongoDB
import UserSQL from '../models/UserSQL.js';

export const signup = async (req, res, next) => {
  try {
    // Hachage du mot de passe
    const hash = await bcrypt.hash(req.body.password, 10);
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

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error while creating user:", error);

    // Renvoyer un message d'erreur détaillé
    const errorMessage = error.message || "An error occurred during signup";
    res.status(500).json({ error: { message: errorMessage } });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email/password pair' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Incorrect email/password pair' });
    }

    res.status(200).json({
      userId: user.email, // Utiliser l'email comme identifiant
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

