import express from 'express';

// Routes
import imageView from './api/image-route';
import uploadRoute from './api/upload-route';

// Middleware
import imageLogger from '../middleware/image-logger';
import path from 'path';

const routes = express.Router();

// ROOT route
routes.get('/', (req, res) => {
    // res.send('Main Route');
    res.sendFile(path.resolve(__dirname,'../HTML/main-page.html'));
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
