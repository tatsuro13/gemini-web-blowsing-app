import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

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

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});