import express from 'express';
import path from 'path';
import fs from 'fs';

import multer from 'multer';

const uploadRoute = express.Router();

const upload = multer({ dest: './assets/full/' }); //{dest: './assets/full/'}

let imagesID = 0;

uploadRoute
    .route('/')
    .get(async (req, res) => { // Serve the HTML page if get req
        res.sendFile(path.resolve(__dirname, '../../HTML/upload.html'));
    })
    .post(upload.single('filename'), async (req, res) => { // Image Uploading if post req
        const tempPath = path.resolve(
            __dirname,
            '../../../',
            req.file?.path ?? ''
        );
        
        const targetPath = path.resolve(
            __dirname,
            `../../../assets/full/image${imagesID}.jpg`
        );

        fs.rename(tempPath, targetPath, (err) => {
            if (err) {
                res.status(500).sendFile(
                    path.resolve(__dirname, '../../HTML/upload.html')
                );
                return;
            } else {
                imagesID++;
                res.status(200).contentType('image/jpeg').sendFile(targetPath);
                //   .end("File uploaded!");
            }
        });
    });

export default uploadRoute;
