// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupérer le token depuis l'en-tête Authorization
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userEmail = decodedToken.email; // Récupérer l'email depuis le token décodé

    if (!userEmail) {
      return res.status(401).json({ error: 'Invalid token: email not found.' });
    }

    req.auth = {
      email: userEmail,
    };
    console.log('Decoded Email:', userEmail);
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid request!' });
  }
};
