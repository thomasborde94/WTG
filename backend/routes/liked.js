import express from 'express'
import { 
    createLiked, 
    modifyLiked, 
    deleteLiked, 
    getOneLiked, 
    getAllLiked 
} from '../controllers/liked.js';
const router = express.Router()

// crée une nouvelle donnée
router.post('/', createLiked)

// modifier une donnée, probablement pas besoin
router.put('/:id', modifyLiked)

// delete une donnée
router.delete('/:id', deleteLiked)

// chercher une donnée spécifique
router.get('/:id', getOneLiked)

// récupère tous les objets de la base
router.get('/', getAllLiked);

export default router