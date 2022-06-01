import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';

const thumbRoute = express.Router();

thumbRoute.get(
    '/',
    async (req: express.Request, res: express.Response): Promise<void> => {
        const imagePath = path.resolve(__dirname, '../../../assets/thumb/');
        let bigString = '';

        // Get all available images
        const fileNames = await fsPromises.readdir(imagePath);
        fileNames.forEach((file): void => {
            if (file != '.gitignore') {
                const stringSegments = file.split('.');

                const filename = stringSegments[2];
                const filetype = stringSegments[3];

                const sizeSegments = stringSegments[1].split('h');
                const w = Number(sizeSegments[0].slice(1));
                const h = Number(sizeSegments[1]);

                bigString += `<a href="/image/?filename=${
                    filename + '.' + filetype
                }&width=${w}&height=${h}"><img src="/image/?filename=${
                    filename + '.' + filetype
                }&width=${w}&height=${h}"></a>`;
            }
        });
        const style = `<style>
    html{
        background-color: rgb(25, 25, 25);
    }
    img{
        margin: 3px;
        width: 300px;
    }
</style>`;

        const fileAndStyle = style + bigString;
        res.send(`${fileAndStyle}`); // Send images as links
    }
);

export default thumbRoute;
