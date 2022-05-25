import express from 'express';

// ---- MIDDLEWARE
const imageFetcher = async (
    req: express.Request,
    res: express.Response,
    next: () => void
): Promise<void> => {
    //let url = req.url;
    res.send('in Middleware');

    //loadImage().then(() => {next()});

    //await asyncFunc();   // only after this we call next() in the middleware
    //next();

    return next();

    //next();
};

export default imageFetcher;
