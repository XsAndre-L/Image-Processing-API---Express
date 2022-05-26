import express from 'express';

// Routes
import imageView from './api/image-route';

// Middleware
import imageFetcher from '../utilities/imageFetcher';

const routes = express.Router();

// ROOT route
routes.get('/', (req, res) => {
    res.send('Main Route');
});

routes.use('/image', imageView);

// Handle Unkonwn pages to prevent server crashes.
routes.get('*', (req, res)=>{
    res.send("Unknown Page.");
})


// Used to view static files within a directory
// routes.use(express.static('images'), imageView);

export default routes;
