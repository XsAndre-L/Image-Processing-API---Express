import express from 'express';

// Routes
import imageView from './api/image-route';

// Middleware
import imageFetcher from '../utilities/imageFetcher';

const routes = express.Router();

// --- ROUTE
routes.get('/', (req, res) => {
    res.send('Main Route');
});

routes.use('/image', imageView);
// routes.use(express.static('images'), imageView);

export default routes;
