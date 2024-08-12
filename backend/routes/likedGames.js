import express from 'express';
import auth from '../middleware/auth.js';
import {
  addLikedGame,
  removeLikedGame,
  getLikedGames,
} from '../controllers/likedGames.js';

const router = express.Router();

router.post('/', auth, addLikedGame);
router.delete('/:gameName', auth, removeLikedGame);
router.get('/', auth, getLikedGames);

export default router;
