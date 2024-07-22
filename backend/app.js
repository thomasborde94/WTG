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

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const liked = new Liked({
        ...req.body
    })
    liked.save()
    .then(() => res.status(201).json({message:'Objet enregistré'}))
    .catch(error => res.status(400).json({error}))
})

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        rawgId: 'fdfdg',
        slug: 'Mon premier objet',
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        rawgId: 'fdsdswfdg',
        slug: 'Mon deuxième objet',
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

export default app