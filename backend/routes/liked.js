import express from 'express'
import { 
    createLiked, 
    modifyLiked, 
    deleteLiked, 
    getOneLiked, 
    getAllLiked 
} from '../controllers/liked.js';
import auth from '../middleware/auth.js';

const router = express.Router()

// crée une nouvelle donnée
router.post('/', auth, createLiked)

// modifier une donnée, probablement pas besoin
router.put('/:id', auth, modifyLiked)

// delete une donnée
router.delete('/:id', auth, deleteLiked)

// chercher une donnée spécifique
router.get('/:id', auth, getOneLiked)

// récupère tous les objets de la base
router.get('/', auth, getAllLiked);

export default router