import express from 'express';

// ---- MIDDLEWARE
const imageLogger = async (
    req: express.Request,
    res: express.Response,
    next: () => void
): Promise<void> => {
    console.log(`Requesting image : ${req.query.filename}`);

    return next();
};

export default imageLogger;
