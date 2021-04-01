import express from 'express';
import renderRoute from './routes/render';

const app = express();
const port = process.env.PORT || 6002;

app.use(...renderRoute);

app.listen(port, () => console.log(`listening on port ${port}`));
