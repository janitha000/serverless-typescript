import serverless from 'serverless-http';
import express from 'express';
const app = express();
app.get('/', (_req, res) => {
    res.send({ message: "This is from express GET " });
});
app.get('/message', (_req, res) => {
    res.send({ message: "This is from express GET message endpoint " });
});
app.use((req, res) => {
    console.log(req);
    res.send({ message: 'Server is running' });
});
export const expressRoutes = serverless(app);
//# sourceMappingURL=handler.js.map