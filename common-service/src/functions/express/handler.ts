import serverless from 'serverless-http';
import express, { Request, Response } from 'express';


const app = express();

app.get('/', (_req: Request, res: Response) => {
    res.send({ message: "This is from express GET " })
})

app.get('/message', (_req: Request, res: Response) => {
    res.send({ message: "This is from express GET message endpoint " })
})

app.use((req: Request, res: Response) => {
    console.log(req)
    res.send({ message: 'Server is running' });
});

export const expressRoutes = serverless(app);


