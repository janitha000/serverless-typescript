import serverless from 'serverless-http';
import express from 'express';
const app = express();
app.get('/', (req, res) => {
    res.send({ message: "This is from express GET " });
});
app.get('/message', (req, res) => {
    res.send({ message: "This is from express GET message endpoint " });
});
export const expressRoutes = serverless(app);
//# sourceMappingURL=handler.js.map