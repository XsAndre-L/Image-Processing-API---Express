import sharp from 'sharp';

async function onlyWidth(
    filePath: string,
    newPath: string,
    width: number
): Promise<sharp.OutputInfo> {
    return await sharp(filePath).resize(width, undefined).toFile(newPath);
}

async function onlyHeight(
    filePath: string,
    newPath: string,
    height: number
): Promise<sharp.OutputInfo> {
    return await sharp(filePath).resize(undefined, height).toFile(newPath);
}

export async function getManipulatedImage(
    filePath: string,
    newPath: string,
    imageWidth?: number,
    imageHeight?: number
): Promise<void> {
    const loadImage = async (): Promise<void> => {
        if (imageHeight && imageWidth) {
            await sharp(filePath)
                .resize(imageWidth, imageHeight)
                .toFile(newPath);
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
