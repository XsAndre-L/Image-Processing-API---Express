import sharp from 'sharp';

async function onlyWidth(filePath: string, newPath: string, width: number) {
    return await sharp(filePath).resize(width, undefined).toFile(newPath);
}

async function onlyHeight(filePath: string, newPath: string, height: number) {
    return await sharp(filePath).resize(undefined, height).toFile(newPath);
}

export async function getManipulatedImage(
    filePath: string,
    newPath: string,
    imageWidth?: number,
    imageHeight?: number
) {
    const loadImage = async () => {
        if (imageHeight && imageWidth) {
            console.log(imageHeight + ' ' + imageWidth);
            if (imageHeight > 0 && imageHeight > 0) {
                await sharp(filePath)
                    .resize(imageWidth, imageHeight)
                    .toFile(newPath);
            } else if (!(imageHeight > 0)) {
                await sharp(filePath)
                    .resize(imageWidth, undefined)
                    .toFile(newPath);
            } else if (!(imageWidth > 0)) {
                await sharp(filePath)
                    .resize(undefined, imageHeight)
                    .toFile(newPath);
            } else {
                await sharp(filePath).toFile(newPath);
            }
        } else if (imageHeight || imageWidth) {
            if (imageHeight) {
                await onlyHeight(filePath, newPath, imageHeight);
            } else {
                await onlyWidth(filePath, newPath, imageWidth ?? 0);
            }
        } else {
            await sharp(filePath).toFile(newPath);
        }
    };
    await loadImage();
}

