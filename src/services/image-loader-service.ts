import sharp from 'sharp';

export async function getManipulatedImage(
    filePath: string,
    newPath: string,
    imageWidth: number,
    imageHeight: number
) {
    const loadImage = async () => {
        await sharp(filePath).resize(imageWidth, imageHeight).toFile(newPath);
    };
    await loadImage();
}

export async function getImage(filePath: string, newPath: string) {
    const loadImage = async () => {
        await sharp(filePath).toFile(newPath);
    };
    await loadImage();
}
