import express, {Request, Response} from 'express';

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());

app.get('api/hello', (req:Request, res: Response) => {
    res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});