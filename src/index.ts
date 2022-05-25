import express from 'express';

import routes from './routes/index-route';

const app = express();
const port = 3000;

app.use('/', routes);

// app.get('/api', (req, res) => {

//   res.send('works');
// });

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});

export default app;
