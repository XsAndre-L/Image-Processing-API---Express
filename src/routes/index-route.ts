import express from 'express';

// Routes
import imageView from './api/image-route';
import uploadRoute from './api/upload-route';

// Middleware
import imageLogger from '../middleware/image-logger';

const routes = express.Router();

// ROOT route
routes.get('/', (req, res) => {
    res.send('Main Route');
});

// routes.post('/', (req, res)=>{
//     console.log("Post");
// })

routes.use('/image', imageLogger, imageView);

routes.use('/upload', uploadRoute);

// Handle Unkonwn pages to prevent server crashes.
routes.get('*', (req, res) => {
    res.status(404).send('Unknown Page.');
});

export default routes;
