import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';
import fs from 'fs';

import { getManipulatedImage } from '../../services/image-loader-service';

const imageView = express.Router();

imageView.get('/', async (req, res) => {
    // filename Quary Required
    if (!req.query.filename || req.query.filename == undefined) {
        const imagePath = path.resolve(__dirname, '../../../assets/full/');
        let bigString = '';

        // Get all available images
        const fileNames = await fsPromises.readdir(imagePath);
        fileNames.forEach((file) => {
            bigString += `<a href="http://localhost:3000/image/?filename=${file}&width=&height=">${file}</a> <br></br>`;
        });
        res.send(`${bigString}`); // Send images as links

        return;
    }

    const fName = String(req.query.filename);

    // Get the input path with or without extention
    let inputPath: string;
    let outputPath: string;

    function validCheck(input: string): number{ // Check if query is valid number and if not return 0
        const num = Number(input);
        if(num){
            if(isNaN(num)){
                return 0;
            }else{
                return num;
            }
        }else{
            return 0;
        }
    }

    const hasExtension = fName.includes('.jpg');
    const ImgSize = {
        x: validCheck(String(req.query.width)),
        y: validCheck(String(req.query.height)),
    };
    if (hasExtension) {
        inputPath = `./assets/full/${fName}`;
        outputPath = path.resolve(
            __dirname,
            `../../../assets/thumb/thumb.w${ImgSize.x}h${ImgSize.y}.${fName}`
        );
    } else {
        inputPath = `./assets/full/${fName}.jpg`;
        outputPath = path.resolve(
            __dirname,
            `../../../assets/thumb/thumb.w${ImgSize.x}h${ImgSize.y}.${fName}.jpg`
        );
    }

    // check if image exists withing "full" folder , if not 404
    if (!fs.existsSync(inputPath)) {
        res.status(404).send(`Image Not Found.`);
        return;
    }

    // if file has not been cached
    if (!fs.existsSync(outputPath)) {
        try {
            await getManipulatedImage(
                inputPath,
                outputPath,
                ImgSize.x,
                ImgSize.y
            );
        } catch (error) {
            res.status(500).send(`Error while manipulating image : ${error}`);
            return;
        }
    }
    console.log(outputPath);
    res.sendFile(outputPath);
    res.set('Cache-Control', 'public, max-age=3000');

    //res.sendFile(path.join(process.env.PWD ?? '' ,'customImages/output.jpg'));
    //res.header('content-disposition', 'attachment; filename="newImage.jpg"');
});

export default imageView;
