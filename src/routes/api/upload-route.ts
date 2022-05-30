import express from 'express';
import path from 'path';
import fs  from 'fs';

import multer from 'multer'


const uploadRoute = express.Router();

const upload = multer({ dest: './assets/full/' });//{dest: './assets/full/'}

let imagesID = 0;

uploadRoute.route('/')
.get(async (req, res)=>{
    res.sendFile(path.resolve(__dirname ,'../../HTML/upload.html'));
})
.post(upload.single('filename'),async (req,res,)=>{

    const tempPath = path.resolve(__dirname, '../../../', req.file?.path ?? '' );
    // const fileN = path.basename(tempPath);
    const targetPath = path.resolve(__dirname, `../../../assets/full/image${imagesID}.jpg`);
    
    fs.rename(tempPath, targetPath, err=>{
        if(err) {
            res.sendFile(path.resolve(__dirname ,'../../HTML/upload.html'));
            // res.status(500).end("File Not Uploaded");
            //console.error(err);
            console.log('Returning')
            return;
            
        }else{

            imagesID++;
            res
                  .status(200)
                  .contentType("image/jpeg")
                  .sendFile(targetPath);
                //   .end("File uploaded!");
        }
    })

})

export default uploadRoute;