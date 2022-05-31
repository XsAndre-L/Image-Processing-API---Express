 ## Build And Run 

1. Install Node Dependencies:  
 ```bash
 npm i
 ```

2. Start Express server  
```bash
npm run start
```

3. In Chrome or any browser the server can be accessed on:  
`localhost:3000`

## About
Endpoints:
- Root Endpoint [http://localhost:3000/]
- Full size image navigator [/image]
    - displays a list of images in "assets/full" directory for easy navigation
- Image Uploader [/upload]
    - accepts .png and .jpg files
- Thumbnail Viewer [/thumb]
- Thumbnail Caching saves all different size images due to width and height being part of thumbnail name
- Image Viewer [/image/?filename="FILENAME"]
- Image Resizer [/image/?filename="FILENAME"&width="WIDTH"&height="HEIGHT"]

## Notes
Picture upload directory  
`assets/full`
Save thumbnail directory
`assets/thumb`

## Scripts
`npm run test`
`npm run start`  
`npm run build`

To run prettier and eslint together 
`npm run check`

To run eslint and prettier individualy
`npm run lint`
`npm run prettier`




