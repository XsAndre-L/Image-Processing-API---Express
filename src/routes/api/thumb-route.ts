import express from 'express';
import {promises as fsPromises} from 'fs';
import path from 'path';

const thumbRoute = express.Router();

thumbRoute.get('/', async (req,res)=>{
    // res.send("Display Thumbnails");
   
        const imagePath = path.resolve(__dirname, '../../../assets/thumb/');
        let bigString = '';

        // Get all available images
        const fileNames = await fsPromises.readdir(imagePath);
        fileNames.forEach((file) => {
            if(file != '.gitignore'){
                bigString += `<a href="/static/${file}"><img src="/static/${file}"></a>`;
                // res.sendFile(path.resolve(imagePath, `./${file}`));
                console.log(`/static/${file}`);
            }
        });
        res.send(`${bigString}`); // Send images as links

        
    
})

export default thumbRoute;