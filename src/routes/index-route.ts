import express from 'express';

// Routes
import thumbRoute from './api/thumb-route';
import imageView from './api/image-route';
import uploadRoute from './api/upload-route';

// Middleware
import imageLogger from '../middleware/image-logger';
import path from 'path';

const routes = express.Router();

// ROOT route
routes.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../HTML/main-page.html'));
});

routes.use('/thumb', thumbRoute);

routes.use('/image', imageLogger, imageView);

routes.use('/upload', uploadRoute);

//routes.use('/static',express.static(path.resolve(__dirname, '../../assets/thumb'))); // method to serve a folder statically

// Handle Unkonwn pages to prevent server crashes.
routes.get('*', (req, res) => {
    res.status(404).send('Unknown Page.');
});

export default routes;
