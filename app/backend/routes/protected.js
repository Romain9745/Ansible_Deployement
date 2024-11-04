import express from 'express';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import { getUser } from '../routes/auth.js';

const router = express.Router();

console.log(process.env.SECRET_KEY);
const jwtMiddleware = expressjwt({
    secret: process.env.SECRET_KEY, // Remplacez par votre clé secrète
    algorithms: ['HS256'],
    userProperty: 'auth', // Ajoute le token décodé à req.auth
});

router.get('/user', jwtMiddleware, async (req,res) => {
    const user = await getUser(req.auth.username);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json({ message: 'Accès autorisé', user: req.auth });
});




export default router;