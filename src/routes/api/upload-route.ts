import express from 'express';
import path from 'path';
import fs from 'fs';

import multer from 'multer';

const uploadRoute = express.Router();

// Type Validation function for multer passed in as a option
function validateFileType(
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
): void {
    const fileType: string | undefined = file.mimetype;
    if (fileType && (fileType == 'image/png' || fileType == 'image/jpeg')) {
        console.log('File uploading...');
        cb(null, true);
    } else {
        console.error(`File of type '${file.mimetype}' not supported.`);
        cb(null, false);
        cb(new Error('File Type Not Supported!'));
    }
}
const upload = multer({ dest: './assets/full/', fileFilter: validateFileType });

uploadRoute
    .route('/')
    .get(async (req, res) => {
        // Serve the HTML page if get req
        res.sendFile(path.resolve(__dirname, '../../../HTML/upload.html'));
    })
    .post(upload.single('filename'), async (req, res) => {
        // Image Uploading if post req
        const tempPath = path.resolve(
            __dirname,
            '../../../',
            req.file?.path ?? ''
        );

        const targetPath = path.resolve(
            __dirname,
            `../../../assets/full/${req.file?.originalname}`
        );

        fs.rename(tempPath, targetPath, (err): fs.NoParamCallback | void => {
            if (err) {
                console.error(`Error while uploading file : ${err}`);
                res.status(500).sendFile(
                    path.resolve(__dirname, '../../../HTML/upload.html')
                );
                return;
            } else {
                res.status(200).contentType('image/jpeg').sendFile(targetPath);
                console.log(
                    `Upload of file "${req.file?.originalname}" Successfull.`
                );
            }
        });
    });

export default uploadRoute;
