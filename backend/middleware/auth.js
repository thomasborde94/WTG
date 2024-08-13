import jwt from 'jsonwebtoken';

// Middleware d'authentification pour vérifier le jeton JWT
export default (req, res, next) => {
  try {
    // Récupère le jeton d'authentification depuis l'en-tête Authorization
    const token = req.headers.authorization.split(' ')[1];

    // Vérifie et décode le jeton avec la clé secrète
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    // Extrait l'email de l'utilisateur à partir du jeton décodé
    const userEmail = decodedToken.email;

    // Si l'email n'est pas trouvé dans le jeton, retourne une erreur d'authentification
    if (!userEmail) {
      return res.status(401).json({ error: 'Invalid token: email not found.' });
    }

    // Crée l'objet auth dans l'objet req. Ici, on rend l'email de l'utilisateur disponible pour les fonctions qui gèrent
    // les routes suivantes dans le cycle de requête-réponse. On peut accéder à req.auth.email, utile pour likedGames
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
