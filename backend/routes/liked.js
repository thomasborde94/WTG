import express from 'express'
import Liked from '../models/Liked.js'
const router = express.Router()

// crée une nouvelle donnée
router.post('/', (req, res, next) => {
    delete req.body._id;
    const liked = new Liked({
        ...req.body
    })
    liked.save()
    .then(() => res.status(201).json({message:'Objet enregistré'}))
    .catch(error => res.status(400).json({error}))
})

// modifier une donnée, probablement pas besoin
router.put('/:id', (req, res, next) => {
  Liked.updateOne({ _id: req.params.id }, {...req.body, _id:req.params.id})
  .then(() => res.status(200).json({message: "objet modifié"}))
  .catch(error => res.status(400).json({error}))
})

// delete une donnée
router.delete('/:id', (req, res, next) => {
  Liked.deleteOne({ _id: req.params.id})
  .then(() => res.status(200).json({message: "objet supprimé"}))
  .catch(error => res.status(400).json({error}))
})

// chercher une donnée spécifique
router.get('/:id', (req, res, next) => {
  Liked.findOne({ _id: req.params.id })
  .then(liked => res.status(200).json(thing))
  .catch(error => res.status(404).json({error}))
})

// récupère tous les objets de la base
router.get('/', (req, res, next) => {
    Liked.find()
    .then(likeds => res.status(200).json(likeds))
    .catch(error => res.status(400).json({error}))
  });

  export default router