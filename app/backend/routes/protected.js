import express from 'express';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import { getUser } from '../routes/auth.js';
import {retrieveBooksByAuthor, retrieveBooksByTitle} from "../libraryApi.js";
import {addBookToUser, deleteBook, getBooksByUser} from "../mySqlLibraryConnector.js";

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

router.get('/findBooks', (req, res) => {
    const title = req.query.title
    const author = req.query.author
    if (title) {
        retrieveBooksByTitle(title)
            .then(titles => {
                res.send(titles)
            })
            .catch(e => {
                res.send(e)
            })
    }
    if (author) {
        retrieveBooksByAuthor(author)
            .then(titles => {
                res.send(titles)
            })
            .catch(e => {
                res.send(e)
            })
    }
})

router.get('/books', (req, res) => {
    const user_id = req.query.user_id
    getBooksByUser(user_id)
        .then(books => {
            res.send(books)
        })
        .catch(e => {
            res.send(e)
        })
})

router.post('/books', (req, res) => {
    const user_id = req.query.user_id
    const book = req.body
    addBookToUser(user_id, book)
        .then(() => {
            res.send('Book added')
        })
        .catch(e => {
            res.send(e)
        })
})

router.delete('/books', (req, res) => {
    const book_id = req.query.book_id
    deleteBook(book_id)
        .then(() => {
            res.send('Book deleted')
        })
        .catch(e => {
            res.send(e)
        })
})



export default router;