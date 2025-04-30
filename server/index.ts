import express, { Request, Response } from "express";
import videoRoutes from './routes/video.ts'

const PORT = process.env.PORT || 3001;

const app = express();

app.use(videoRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('yoooo');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});