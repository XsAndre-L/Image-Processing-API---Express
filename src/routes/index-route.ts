import express from 'express';

// Routes
import imageView from './api/image-route';

// Middleware
import imageLogger from '../middleware/image-logger';

const routes = express.Router();

// ROOT route
routes.get('/', (req, res) => {
    res.send('Main Route');
});

routes.use('/image', imageLogger, imageView);

// Handle Unkonwn pages to prevent server crashes.
routes.get('*', (req, res) => {
    res.send('Unknown Page.');
});

export default routes;
