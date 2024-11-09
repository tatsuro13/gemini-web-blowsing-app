import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getGeminiAnswer } from './services/getGeminiAnswer';
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

const corsOptions = {
    origin: 'http://localhost:9000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/hello', (req:Request, res: Response) => {
    res.json({ message: 'Hello World!' });
});

app.get('/api/gemini', async(req:Request, res: Response) => {
    const result = await getGeminiAnswer(req.body);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});