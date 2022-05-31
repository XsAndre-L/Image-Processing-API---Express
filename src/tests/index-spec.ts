import supertest from 'supertest';
import app from '../index';
import sharp from 'sharp';

const st = supertest(app);

describe('Test endpoint responses and image resize functionality', () => {
    // End Points
    // Root Endpoint
    it('Root Endpoint /', async () => {
        const response = await st.get('/');
        expect(response.status).toBe(200);
    });
    // Image Endpoint
    it('Image Endpoint /image', async () => {
        const response = await st.get('/image');
        expect(response.status).toBe(200);
    });
    // Upload Endpoint
    it('Upload Endpoint /upload', async () => {
        const response = await st.get('/upload');
        expect(response.status).toBe(200);
    });
    // Thumbnail Endpoint
    it('Thumbnail Endpoint /thumb', async () => {
        const response = await st.get('/thumb');
        expect(response.status).toBe(200);
    });

    // Image View and Manipulation Functionality
    // File Name & No Extension
    it('File Name & No Extension /image/?filename=fjord', async () => {
        const response = await st.get('/image/?filename=fjord');
        expect(response.status).toBe(200);
    });
    // File Name & Extension
    it('File Name & Extension /image/?filename=fjord.jpg', async () => {
        const response = await st.get('/image/?filename=fjord.jpg');
        expect(response.status).toBe(200);
    });
    // File Name & Width
    it('File name & Width /image/?filename=fjord.jpg&width=500', async () => {
        const response = await st.get('/image/?filename=fjord.jpg&width=500');
        expect(response.status).toBe(200);
    });
    // File Name & Height
    it('File name & Height /image/?filename=fjord.jpg&height=500', async () => {
        const response = await st.get('/image/?filename=fjord.jpg&height=500');
        expect(response.status).toBe(200);
    });
    // File Name & Width & Height
    it('File name & Width & Height /image/?filename=fjord.jpg&width=500&height=500', async () => {
        const response = await st.get(
            '/image/?filename=fjord.jpg&width=500&height=500'
        );
        expect(response.status).toBe(200);

        const meta = await sharp(response.body).metadata();
        expect(meta.width).toBe(500);
        expect(meta.height).toBe(500);

        expect(response.header['content-type']).toBe('image/jpeg');
    });

    // Unknown Image
    it('File name & Width & Height /image/?filename=randomname.jpg&width=500&height=500', async () => {
        const response = await st.get(
            '/image/?filename=randomname.jpg&width=500&height=500'
        );
        expect(response.status).toBe(404);
    });

    // Different Image
    it('Different Image /image?filename=encenadaport', async () => {
        const response = await st.get('/image?filename=encenadaport');
        expect(response.status).toBe(200);
    });

    // Unknown Route
    it('Unknown Route /wrongroute', async () => {
        const response = await st.get('/wrongroute');
        expect(response.status).toBe(404);
    });

    //
});
