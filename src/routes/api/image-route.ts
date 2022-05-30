import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';

import {
    getImage,
    getManipulatedImage,
} from '../../services/image-loader-service';

const imageView = express.Router();

imageView.get('/', async (req, res) => {
    // filename Quary Required
    if (!req.query.filename || req.query.filename == undefined) {
        console.log('in if')
        //res.send(`?filename=fjord&width=1000&height=1000`);
        const imagePath = path.resolve(__dirname, '../../../assets/full/');
        let bigString = '';
        // let fileNames: string[];

        const fileNames = await fsPromises.readdir(imagePath);

        fileNames.forEach(file => {
            bigString += `<a href="http://localhost:3000/image/?filename=${file}">${file}</a> <br></br>`;
        });


        res.send(`${bigString}`);

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

    // check if image exists 404    fsPromises module .fileExists()

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
        res.status(500).send(`Error while manipulating image : ${error}`);
        return;
    }

    //res.sendFile(path.join(process.env.PWD ?? '' ,'customImages/output.jpg'));
    res.sendFile(outputPath);
    res.set('Cache-Control', 'public, max-age=31557600');
    //res.header('content-disposition', 'attachment; filename="newImage.jpg"');
});

export default imageView;
