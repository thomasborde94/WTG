import Liked from '../models/Liked.js'

export const createLiked = (req, res, next) => {
    delete req.body._id;
    const liked = new Liked({
        ...req.body
    })
    liked.save()
    .then(() => res.status(201).json({message:'Objet enregistré'}))
    .catch(error => res.status(400).json({error}))
}

export const modifyLiked = (req, res, next) => {
    Liked.updateOne({ _id: req.params.id }, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message: "objet modifié"}))
    .catch(error => res.status(400).json({error}))
}

export const deleteLiked = (req, res, next) => {
    Liked.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({message: "objet supprimé"}))
    .catch(error => res.status(400).json({error}))
}

export const getOneLiked = (req, res, next) => {
    Liked.findOne({ _id: req.params.id })
    .then(liked => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}))
}

export const getAllLiked = (req, res, next) => {
    Liked.find()
    .then(likeds => res.status(200).json(likeds))
    .catch(error => res.status(400).json({error}))
}
