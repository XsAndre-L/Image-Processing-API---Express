import express from 'express';
import sharp from 'sharp';
// import * as path from 'path';
import path from 'path';

const imageView = express.Router();

imageView.get('/', async (req, res) => {
    //const ImgSize = [Number(req.query.width), Number(req.query.height)];
    if (!req.query.filename || req.query.filename == undefined) {
        res.send('?filename=fjord&width=1000&height=1000');
    }
    const Filename = String(req.query.filename);

    const OutputPath = path.resolve(__dirname, '../../../thumb/output.jpg');

    // Get the input path with or without extention
    let InputPath: string;
    
    const hasExtension = Filename.includes('.jpg');
    if (hasExtension) {
        InputPath = `./full/${Filename}`;
    } else {
        InputPath = `./full/${Filename}.jpg`;
    }

    let image: sharp.OutputInfo;

    if (!req.query.width || !req.query.height) {
        const loadImage = async () => {
            image = await sharp(InputPath).toFile(OutputPath);
        };
        await loadImage();
    } else {
        enum ImgSize {
            x = Number(req.query.width),
            y = Number(req.query.height),
        }

        const loadImage = async () => {
            image = await sharp(InputPath)
                .resize(ImgSize.x, ImgSize.y)
                .toFile(OutputPath);
        };
        await loadImage();
    }

    //console.log(image);
    //res.sendFile(path.join(process.env.PWD ?? '' ,'customImages/output.jpg'));
    res.sendFile(OutputPath);
    res.setHeader('cache-control', 'public, max-age=300');
    //res.header('content-disposition', 'attachment; filename="newImage.jpg"');
    //res.send('output.jpg');
});

imageView.use(express.static('full'));

export default imageView;
