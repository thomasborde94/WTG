import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

// needed to fin the env var
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import Liked from './models/Liked.js'

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// crée l'application express
const app = express();


// met à disposition les body des req content-type json  directement sur l'objet req
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res, next)=> {
    console.log("MONGO_URI: ", process.env.MONGO_URI)
    next()
})

// crée une nouvelle donnée
app.post('/api/liked', (req, res, next) => {
    delete req.body._id;
    const liked = new Liked({
        ...req.body
    })
    liked.save()
    .then(() => res.status(201).json({message:'Objet enregistré'}))
    .catch(error => res.status(400).json({error}))
})

// modifier une donnée, probablement pas besoin
app.put('./api/liked/:id', (req, res, next) => {
  Liked.updateOne({ _id: req.params.id }, {...req.body, _id:req.params.id})
  .then(() => res.status(200).json({message: "objet modifié"}))
  .catch(error => res.status(400).json({error}))
})

// delete une donnée
app.delete('/api/liked/:id', (req, res, next) => {
  Liked.deleteOne({ _id: req.params.id})
  .then(() => res.status(200).json({message: "objet supprimé"}))
  .catch(error => res.status(400).json({error}))
})

// chercher une donnée spécifique
app.get('/api/liked/:id', (req, res, next) => {
  Liked.findOne({ _id: req.params.id })
  .then(liked => res.status(200).json(thing))
  .catch(error => res.status(404).json({error}))
})

// récupère tous les objets de la base
app.get('/api/liked', (req, res, next) => {
    Liked.find()
    .then(likeds => res.status(200).json(likeds))
    .catch(error => res.status(400).json({error}))
  });

export default app