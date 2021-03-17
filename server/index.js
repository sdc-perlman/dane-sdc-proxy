import express from 'express';
import reviewsRender from './routes/reviewsRender';

const app = express();
const port = process.env.PORT || 6002;

app.use(...reviewsRender);

app.listen(port, () => console.log(`listening on port ${port}`));
