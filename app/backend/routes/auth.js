import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../mysql.js';
import { validationResult,check,matchedData,body } from 'express-validator';

const router = express.Router();

router.post('/login',[
    check('username').isLength({ min: 3 }).trim().escape(),
    check('password').notEmpty().trim().escape(),
  ], async (req, res) => {
    try {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).send('Invalid input');
        }

        const data = matchedData(req);
        const id = req.body.id;
        const user = await getUser(data.username);
        if (!user) {
            return res.status(401).send('Wrong password or username');
        }
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            return res.status(401).send('Wrong password or username');
        }
        const token = jwt.sign({ id,user}, process.env.SECRET_KEY, { expiresIn: '1800s' });
        res.status(200).json({ token });
        }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

router.get('/signup',body('username').isLength({ min: 3 }).trim().escape().custom(async (value) => {
if(checkUser(value)) throw new Error('Username already in use');}),async (req,res) => {
    try {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).send('Invalid input');
        }
        const data = matchedData(req);
        newpassword = await bcrypt.hash(data.password, 10);
        await createUser(data.username, newpassword);
        res.status(201).send('User created');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});





export async function getUser(username) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE name = ?', [username]);
    return rows[0];
}

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO Users (name, password) VALUES (?, ?)', [username, hashedPassword]);
}

async function checkUser(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE name = ?', [username]);
    return rows.length > 0;
}

export default router;