import express from 'express';
import path from 'path';

import {
    getImage,
    getManipulatedImage,
} from '../../services/image-loader-service';

const imageView = express.Router();

imageView.get('/', async (req, res) => {
    // filename Quary Required
    if (!req.query.filename || req.query.filename == undefined) {
        res.send('?filename=fjord&width=1000&height=1000');
        return;
    }

    const fName = String(req.query.filename);

    // Get the input path with or without extention
    let inputPath: string;
    let outputPath: string;

    const hasExtension = fName.includes('.jpg');
    if (hasExtension) {
        inputPath = `./assets/full/${fName}`;
        outputPath = path.resolve(
            __dirname,
            `../../../assets/thumb/thumb.${fName}`
        );
    } else {
        inputPath = `./assets/full/${fName}.jpg`;
        outputPath = path.resolve(
            __dirname,
            `../../../assets/thumb/thumb.${fName}.jpg`
        );
    }

    try {
        if (req.query.width && req.query.height) {
            enum ImgSize {
                x = Number(req.query.width),
                y = Number(req.query.height),
            }
            await getManipulatedImage(
                inputPath,
                outputPath,
                ImgSize.x,
                ImgSize.y
            );
        } else {
            await getImage(inputPath, outputPath);
        }
    } catch (error) {
        res.send(`Error while manipulating image : ${error}`);
        return;
    }

    //res.sendFile(path.join(process.env.PWD ?? '' ,'customImages/output.jpg'));
    res.sendFile(outputPath);
    res.set('Cache-Control', 'public, max-age=31557600');
    //res.header('content-disposition', 'attachment; filename="newImage.jpg"');
});

export default imageView;
