import { getManipulatedImage } from '../../services/image-loader-service';
import fs from 'fs';
import path from 'path';

// Tests Image Processing
it('Expect image to be generated', async (): Promise<void> => {
    const ImgSize = {
        x: 300,
        y: 200,
    };
    const inputPath = path.resolve(__dirname, `../../../assets/full/fjord.jpg`);
    const outputPath = path.resolve(
        __dirname,
        `../../../assets/thumb/thumb.w${ImgSize.x}h${ImgSize.y}.fjord.jpg`
    );

    // if exists delete file
    if (fs.existsSync(outputPath)) {
        await fs.unlinkSync(outputPath);
        console.log('Removed testing Image...');
    }

    await getManipulatedImage(inputPath, outputPath, ImgSize.x, ImgSize.y);

    expect(fs.existsSync(outputPath)).toEqual(true);
});
