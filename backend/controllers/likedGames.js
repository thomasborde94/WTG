import LikedGameSQL from '../models/LikedGameSQL.js';
import UserSQL from '../models/UserSQL.js';

// Ajoute un jeu aimé à la liste de l'utilisateur
export const addLikedGame = async (req, res) => {
  // Extrait le nom du jeu et le genre du corps de la requête
  const { gameName, genre } = req.body;

  // Extrait l'email de l'utilisateur à partir de l'objet d'authentification fourni par le middleware
  const userEmail = req.auth.email;

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is missing from request.' });
  }

  try {
    // Vérifie si l'utilisateur existe dans la base de données
    const user = await UserSQL.findOne({ where: { email: userEmail } });
    if (!user) {
      // Si l'utilisateur n'existe pas, renvoye une erreur 404
      return res.status(404).json({ error: 'User not found' });
    }

    // Crée une nouvelle entrée pour le jeu aimé dans la base de données
    const likedGame = await LikedGameSQL.create({
      email: userEmail,
      game_name: gameName,
      genre: genre,
    });

    // Renvoye une réponse de succès avec le jeu aimé ajouté, ou erreur 500 avec message d'erreur
    res.status(201).json({ message: 'Game liked successfully!', likedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while liking the game.' });
  }
};

// Récupère tous les jeux aimés d'un utilisateur
export const getLikedGames = async (req, res) => {
  const userEmail = req.auth.email;

  try {
    // Récupère tous les jeux aimés de l'utilisateur en cherchant par email
    const likedGames = await LikedGameSQL.findAll({
      where: {
        email: userEmail,
      },
    });

    // Renvoye la liste des jeux aimés en réponse
    res.status(200).json(likedGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching liked games.' });
  }
};

// Supprime un jeu aimé de la liste d'un utilisateur
export const removeLikedGame = async (req, res) => {
  const gameName = req.params.gameName; // Utilise req.params pour obtenir le nom du jeu depuis l'URL (voir route likedGame)
  const userEmail = req.auth.email;

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is missing from request.' });
  }

  try {
    // Supprime le jeu aimé pour l'utilisateur
    const result = await LikedGameSQL.destroy({
      where: {
        email: userEmail,
        game_name: gameName, // Compare avec le nom du jeu extrait de l'URL
      },
    });

    if (result === 0) {
      // Vérifie si un jeu a été supprimé (si aucun jeu n'est trouvé, `result` sera égal à 0)
      return res.status(404).json({ error: 'Game not found in liked games.' });
    }

    // Renvoye une réponse de succès après la suppression
    res.status(200).json({ message: 'Game unliked successfully!' }); // Assure de renvoyer une réponse JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while unliking the game.' });
  }
};