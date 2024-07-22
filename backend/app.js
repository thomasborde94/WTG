import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

// needed to fin the env var
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


// crée l'application express
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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
    console.log(req.body)
    res.status(201).json({
        message: 'objet créé'
    })
})

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        slug: 'Mon premier objet',
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        slug: 'Mon deuxième objet',
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

export default app