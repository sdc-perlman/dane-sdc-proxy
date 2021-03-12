const express = require('express');
const reviewsAllRoutes = require('./routes/reviewsAll');
const reviewCalculationRoutes = require('./routes/reviewCalculationRoutes');

const app = express();

app.use(...reviewsAllRoutes);
app.use(...reviewCalculationRoutes);

const port = process.env.PORT || 6002;

app.listen(port, () => console.log(`listening on port ${port}`));
