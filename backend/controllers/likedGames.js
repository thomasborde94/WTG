// backend/controllers/likedGames.js
import LikedGameSQL from '../models/LikedGameSQL.js';
import UserSQL from '../models/UserSQL.js';

// Ajouter un jeu aimé
export const addLikedGame = async (req, res) => {
  const { gameName, genre } = req.body;
  const userEmail = req.auth.email; // Utilisez l'email depuis l'objet d'authentification

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is missing from request.' });
  }

  try {
    // Vérifiez si l'utilisateur existe dans la base de données
    const user = await UserSQL.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const likedGame = await LikedGameSQL.create({
      email: userEmail, // Utilisez l'email ici
      game_name: gameName,
      genre: genre,
    });

    res.status(201).json({ message: 'Game liked successfully!', likedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while liking the game.' });
  }
};

export const getLikedGames = async (req, res) => {
  const userEmail = req.auth.email;

  try {
    const likedGames = await LikedGameSQL.findAll({
      where: {
        email: userEmail, // Utilisez l'email
      },
    });

    res.status(200).json(likedGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching liked games.' });
  }
};

export const removeLikedGame = async (req, res) => {
  const gameName = req.params.gameName; // Utilisez req.params pour obtenir le nom du jeu depuis l'URL
  const userEmail = req.auth.email; // Utilisez l'email depuis l'objet d'authentification

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is missing from request.' });
  }

  try {
    // Supprimez le jeu aimé pour l'utilisateur
    const result = await LikedGameSQL.destroy({
      where: {
        email: userEmail,
        game_name: gameName, // Comparez avec le nom du jeu extrait de l'URL
      },
    });

    if (result === 0) {
      return res.status(404).json({ error: 'Game not found in liked games.' });
    }

    res.status(200).json({ message: 'Game unliked successfully!' }); // Assurez-vous de renvoyer une réponse JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while unliking the game.' });
  }
};