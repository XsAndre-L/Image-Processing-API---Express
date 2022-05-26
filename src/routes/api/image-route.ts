import express from 'express';
import sharp from 'sharp';
// import * as path from 'path';
import path from 'path';

const imageView = express.Router();

imageView.get('/', async (req, res) => {

    // filename Quary Required
    if (!req.query.filename || req.query.filename == undefined) {
        res.send('?filename=fjord&width=1000&height=1000');
        return;
    }

    const Filename = String(req.query.filename);

    // Get the input path with or without extention
    let InputPath: string;
    let OutputPath: string;

    const hasExtension = Filename.includes('.jpg');
    if (hasExtension) {
        InputPath = `./assets/full/${Filename}`;
        OutputPath = path.resolve(__dirname, `../../../assets/thumb/${Filename}`);
    } else {
        InputPath = `./assets/full/${Filename}.jpg`;
        OutputPath = path.resolve(__dirname, `../../../assets/thumb/${Filename}.jpg`);
    }

    //let image: sharp.OutputInfo;

    try {
        if (!req.query.width || !req.query.height) {
            const loadImage = async () => {
                await sharp(InputPath).toFile(OutputPath);
            };
            await loadImage();
        } else {
            enum ImgSize {
                x = Number(req.query.width),
                y = Number(req.query.height),
            }

            const loadImage = async () => {
                await sharp(InputPath)
                    .resize(ImgSize.x, ImgSize.y)
                    .toFile(OutputPath);
            };
            await loadImage();
        }
    } catch (error) {
        res.send(`Error while manipulating image ${error}`);
        return;
    }

    //console.log(image);
    //res.sendFile(path.join(process.env.PWD ?? '' ,'customImages/output.jpg'));
    res.sendFile(OutputPath);
    res.setHeader('cache-control', 'public, max-age=300');
    //res.header('content-disposition', 'attachment; filename="newImage.jpg"');
});

//imageView.use(express.static('full'));

export default imageView;
