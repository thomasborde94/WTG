import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import likedRoutes from './routes/liked.js'
import userRoutes from './routes/user.js'

// needed to fin the env var
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// crée l'application express
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// met à disposition les body des req content-type json  directement sur l'objet req
app.use(express.json())

app.use('/api/liked', likedRoutes)
app.use('/api/auth', userRoutes)

export default app