import express from 'express';
import 'dotenv/config'
import authRoutes from './routes/auth.js';
import protectedRoute from './routes/protected.js';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173', 'http://127.0.0.1:5173','http://localhost:4173', 'http://127.0.0.1:4173']}));
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


